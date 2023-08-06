/* Robust Header Compression (ROHC) Python Extension Module
 */

#include "Python.h"
#include "structmember.h"
#include <math.h>
#include <string.h>
#include <rohc/rohc.h>
#include <rohc/rohc_comp.h>
#include <rohc/rohc_decomp.h>

#define MAX_PROFILES 16
#define MAX_MTU 9200

/* static PyObject *err; */

typedef struct {
  PyObject_HEAD
  struct rohc_comp *comp; /* Pointer to the Compressor */
  struct rohc_decomp *decomp; /* Pointer to the Decompressor */
  uint8_t feedback_buf[MAX_MTU]; /* Buffer for feedback */
  struct rohc_buf feedback; /* Buffer to store feedback */
  int profiles[MAX_PROFILES]; /* Profiles in Use */
  int num_profiles; /* Number of Active Profiles */
  int mode; /* Decompressor Mode */
} ROHC;

int  get_profile_by_name(char *);
void add_profile_by_num(ROHC *, int);
static PyTypeObject ROHCType;

/* Random Number Generation */
static int gen_random_num(const struct rohc_comp *const comp,
                          void *const user_context)
{
        return rand();
}

int
get_profile_by_name(char * request)
{
  char names[7][15] = { "UNCOMPRESSED", "RTP", "UDPLITE", "ESP", "IP", "TCP", "UDP" };
  int return_codes[7] = { ROHC_PROFILE_UNCOMPRESSED, ROHC_PROFILE_RTP,
  ROHC_PROFILE_UDPLITE, ROHC_PROFILE_ESP, ROHC_PROFILE_IP, ROHC_PROFILE_TCP,
  ROHC_PROFILE_UDP };
  int i = 0;

  for (i=0;i<7;i++)
    if (strncmp(request,names[i],sizeof(names[i])) == 0)
      return return_codes[i];

  // No Match
  return -1;
}

void
add_profile_by_num(ROHC* self, int profile)
{
  int i;

  // Add profile to the list only if it does not already exist!
  
  // Check to see if it already exists!  If so we are done.
  for (i=0;i<self->num_profiles;i++)
    if (self->profiles[i] == profile)
      return;

  // Add the profile to the end of the list
  self->profiles[self->num_profiles] = profile;
  self->num_profiles++;

  return;
}

/* Internal function used to free up the compressor/decompressor */
static PyObject *
ROHC_free(ROHC *self)
{
  if (self->comp != NULL)
  {
    rohc_comp_free(self->comp);
    self->comp = NULL;
  }
  if (self->decomp != NULL)
  {
    rohc_decomp_free(self->decomp);
    self->decomp = NULL;
  }
  Py_RETURN_NONE;
}

/* destructor */
static void
ROHC_dealloc(ROHC* self)
{
  // Free up (de)compressor(s)
  ROHC_free(self);
  // Make sure to free up memory on heap
  //  (aka: Reverse any PyMem_Add with PyMem_Del)
  // Free the object itself
  self->ob_type->tp_free((PyObject*)self);
}

/* constructor */
static PyObject *
ROHC_new(PyTypeObject *type, PyObject *args)
{
  int tmp_bidirectional, tmp_reliable;
  ROHC *self;

  // REFCOUNT NOTE: Call auto adds reference, macro Py_INCREF not needed
  self = (ROHC *)type->tp_alloc(type, 0);
  if (self != NULL) 
  {
    // Default Mode is Unidirectional
    tmp_bidirectional = 0; tmp_reliable = 0;
    if ((! PyArg_ParseTuple(args, "|ii", &tmp_bidirectional, &tmp_reliable)))
    {
      // Failing here means that the passed argument failed a cast
      PyErr_SetString(PyExc_ValueError, "Malformed Mode Request!");
      // cleanup
      Py_DECREF((PyObject *)self);
      return NULL;
    }
    // Set the Mode
    if (tmp_bidirectional == 0)
      self->mode = ROHC_U_MODE;
    else if (tmp_reliable == 0)
      self->mode = ROHC_O_MODE;
    else
      self->mode = ROHC_R_MODE;
    self->comp = NULL;
    self->decomp = NULL;
    return (PyObject *)self;
  }
  return PyErr_NoMemory();
}

/*  initialize */
static PyObject *
ROHC_init(ROHC *self)
{
  int i;

  // Reset the Profiles to Uncompressed ONLY
  self->profiles[0] = ROHC_PROFILE_UNCOMPRESSED;
  for (i=1;i<MAX_PROFILES;i++)
    self->profiles[i] = -1;

  // Free up any existing (de)compressor(s)
  ROHC_free(self);
  // Fire up a new compressor and decompressor
  self->comp = rohc_comp_new2(ROHC_LARGE_CID, ROHC_LARGE_CID_MAX, gen_random_num, NULL);
  if (self->comp == NULL)
  {
    PyErr_SetString(PyExc_MemoryError,"Unable to Spawn a Compressor");
    return PyErr_NoMemory();
  }
  self->decomp = rohc_decomp_new2(ROHC_LARGE_CID, ROHC_LARGE_CID_MAX, self->mode);
  if (self->decomp == NULL)
  {
    PyErr_SetString(PyExc_MemoryError,"Unable to Spawn a Decompressor");
    return PyErr_NoMemory();
  }

  // Disable Segmenting (MRRU = 0) otherwise set to MAX_MTU
  if(!rohc_comp_set_mrru(self->comp, 0))
  {
    PyErr_SetString(PyExc_RuntimeError, "Failed to set MRRU at the compressor");
    return NULL;
  }
  if(!rohc_decomp_set_mrru(self->decomp, 0))
  {
    PyErr_SetString(PyExc_RuntimeError, "Failed to set MRRU at the decompressor");
    return NULL;
  }

  // Initialize the feedback buffer
  self->feedback.time.sec = 0;
  self->feedback.time.nsec = 0;
  self->feedback.max_len = MAX_MTU;
  self->feedback.data = self->feedback_buf;
  self->feedback.offset = 0;
  self->feedback.len = 0;
  memset(self->feedback_buf, 0, sizeof(self->feedback_buf));


  // Enable the basic profile
  if ( (!rohc_comp_enable_profile(self->comp, self->profiles[0])) || (!rohc_decomp_enable_profile(self->decomp, self->profiles[0])) )
  {
    PyErr_SetString(PyExc_RuntimeError, "Failed to enable the Uncompressed Profile");
    return NULL;
  }
  self->num_profiles = 1;

  Py_RETURN_NONE;
}

/* declare members to python */
// Nothing to declare {"profiles", T_INT, offsetof(ROHC, profiles), 0, "ROHC Profiles"},
static PyMemberDef ROHC_members[] = {
    {"num_profiles", T_INT, offsetof(ROHC, num_profiles), 0, "Number of Active Profiles"},
    {"mode", T_INT, offsetof(ROHC, mode), 0, "ROHC Mode (ENUM)"},
    {NULL} /* Sentinel */
};

/* * * * * * * * * * * * * * Methods * * * * * * * * * * * * * */

/* clear - Clean slate the (de)compressor.  This function simply re-initializes
 * the object */
static PyObject *
ROHC_clear(ROHC *self)
{
  ROHC_init(self);
  Py_RETURN_NONE;
}

/* reset - Similar to clear except the previous profiles are reinstated */
static PyObject *
ROHC_reset(ROHC *self)
{
  int i;
  char msg[300];
  int tmp_profiles[MAX_PROFILES] = { -1 }; /* Profiles in Use */
  int tmp_num;
  
  tmp_num = self->num_profiles;
  for (i=0;i<tmp_num;i++)
    tmp_profiles[i] = self->profiles[i];

  ROHC_init(self);

  for (i=0;i<tmp_num;i++)
  {
    if ( (!rohc_comp_enable_profile(self->comp, tmp_profiles[i])) || (!rohc_decomp_enable_profile(self->decomp, tmp_profiles[i])) )
    {
      snprintf(msg,sizeof(msg),"Failed to enable the %s profile",rohc_get_profile_descr(tmp_profiles[i]));
      PyErr_SetString(PyExc_RuntimeError, msg);
      return NULL;
    }
    add_profile_by_num(self, tmp_profiles[i]);
  }

  Py_RETURN_NONE;
}

/* reinit - Force the compressor to re-initialize all its contexts.  Soft Reset. */
static PyObject *
ROHC_reinit(ROHC *self)
{
  if (rohc_comp_force_contexts_reinit(self->comp))
    Py_RETURN_TRUE;
  Py_RETURN_FALSE;
}

/* activate_profiles - Will activate profiles - passed as a list of short
 * strings such as "IP", "UDP", ... - within the compressor and decompressor */
static PyObject *
ROHC_activate_profiles(ROHC *self, PyObject *args)
{
  int i, p;
  char msg[300];
  char *profile;
  int num_of_profiles;
  PyObject *profile_list;

  if (! PyArg_ParseTuple(args, "O", &profile_list))
  {
    // Failing here means that the passed argument failed a cast
    PyErr_SetString(PyExc_ValueError, "Malformed Profile List!");
    return NULL;
  }

  if (!PyList_Check(profile_list))
  {
    PyErr_SetString(PyExc_ValueError, "Profiles must be supplied as a list.");
    return NULL;
  }

  num_of_profiles = (int)PyList_Size(profile_list);

  for (i=0;i<num_of_profiles;i++)
  {
    profile = PyString_AsString(PyList_GetItem(profile_list, i));
    if (profile != NULL) {
      // We have a genuine string to process
      p = get_profile_by_name(profile);
      if (p >= 0)
      {
        // Attempt to activate that profile
        if ( (!rohc_comp_enable_profile(self->comp, p)) || (!rohc_decomp_enable_profile(self->decomp, p)) )
        {
          snprintf(msg,sizeof(msg),"Failed to enable the %s profile",rohc_get_profile_descr(p));
          PyErr_SetString(PyExc_RuntimeError, msg);
          return NULL;
        }
        add_profile_by_num(self, p);
      }
      else
      {
        snprintf(msg,sizeof(msg),"Unknown Profile: %s",profile);
        PyErr_SetString(PyExc_ValueError, msg);
        return NULL;
      }
    }
    else
    {
      PyErr_SetString(PyExc_ValueError, "Malformed String for Profile Name!");
      return NULL;
    }
  }
  Py_RETURN_NONE;
}

/* feedback_to_send - Simple test, returns true if there is feedback pending to be sent */
static PyObject *
ROHC_feedback_to_send(ROHC *self)
{
  if (self->feedback.len > 0)
  {
    Py_RETURN_TRUE;
  }
  Py_RETURN_FALSE;
}

/* get_feedback - Get any feedback information only (no packet to compress) */
static PyObject *
ROHC_get_feedback(ROHC *self)
{
  struct rohc_buf ip_packet;
  unsigned char rohc_buffer[MAX_MTU];
  struct rohc_buf rohc_packet = rohc_buf_init_empty(rohc_buffer, MAX_MTU);

  // If there was feedback data to send, return it!!
  if (self->feedback.len > 0)
  {
    rohc_buf_append_buf(&rohc_packet, self->feedback);
    self->feedback.len = 0;
    self->feedback.offset = 0;
    // SUCCESS! - Return the feedback packet
    return PyByteArray_FromStringAndSize(rohc_packet.data,rohc_packet.len);
  }
  Py_RETURN_NONE;

}

/* compress - Compress a single packet */
static PyObject *
ROHC_compress(ROHC *self, PyObject *buffer)
{
  PyObject *bytearray;
  struct rohc_buf ip_packet;
  unsigned char rohc_buffer[MAX_MTU];
  struct rohc_buf rohc_packet = rohc_buf_init_empty(rohc_buffer, MAX_MTU);
  int status;

  /* Fields of rohc_buf
  .time.sec = 0;
  .time.nsec = 0;
  .max_len = MAX_MTU;
  .data = buffer;
  .offset = 0;
  .len = 0;
  */

  if (self->comp == NULL)
  {
    // Compressor is OFFLINE??
    PyErr_SetString(PyExc_RuntimeError, "Compressor is not available!");
    return NULL;
  }

  if PyString_Check(buffer)
  {
    // We were passed string, convert to a byte array
    bytearray = PyByteArray_FromObject(buffer);
  }
  else if PyByteArray_Check(buffer)
  {
    bytearray = buffer;
  }
  else
  {
    // Don't know what we got, but we can't use it
    PyErr_SetString(PyExc_ValueError, "Function requires a Python String or Bytearray!");
    return NULL;
  }

  // Start populating the ip_packet info
  ip_packet.len = PyByteArray_Size(bytearray);
  ip_packet.max_len = ip_packet.len;
  if (ip_packet.len > MAX_MTU)
  {
    // We have a problem! To big a packet, and we don't care to malloc more space (assuming MAX_MTU of 9200) :)
    PyErr_SetString(PyExc_OverflowError, "Packet is to large!");
    return NULL;
  }
  ip_packet.data = PyByteArray_AsString(bytearray);

  // Right now we don't care about the time properties of the compressor
  ip_packet.time.sec = 0;
  ip_packet.time.nsec = 0;

  // No offset for our buffer
  ip_packet.offset = 0;

  // If there was feedback data to send, send it!!
  if (self->feedback.len > 0)
  {
    rohc_buf_append_buf(&rohc_packet, self->feedback);
    rohc_buf_pull(&rohc_packet, self->feedback.len);
  }

  status = rohc_compress4(self->comp, ip_packet, &rohc_packet);

  if (status == ROHC_STATUS_SEGMENT)
  {
    // We segmented - PUNT for now?  Normally would call rohc_comp_get_segment to get the rest
    PyErr_SetString(PyExc_NotImplementedError, "Currently we cannot handle fragmented segments... PUNT!");
    return NULL;
  }
  else if (status == ROHC_STATUS_OK)
  {
    // If we tried to insert feedback, consider it on it's way and clear the feedback buffer.
    if (self->feedback.len > 0)
    {
      rohc_buf_push(&rohc_packet, self->feedback.len);
      self->feedback.len = 0;
      self->feedback.offset = 0;
    }
    // SUCCESS! - Return the compressed packet
    return PyByteArray_FromStringAndSize(rohc_packet.data,rohc_packet.len);
  }
  else
  {
    // Failed!
    PyErr_SetString(PyExc_RuntimeError, "Compression of the Packet Failed!");
    return NULL;
  }
  Py_RETURN_NONE;
}

/* decompress - Decompress a single ROHC packet */
static PyObject *
ROHC_decompress(ROHC *self, PyObject *buffer)
{
  PyObject *bytearray;
  struct rohc_buf rohc_packet;
  unsigned char ip_buffer[MAX_MTU];
  struct rohc_buf ip_packet = rohc_buf_init_empty(ip_buffer, MAX_MTU);
  uint8_t feedback_buf_snd[MAX_MTU]; /* Buffer for feedback sent */
  uint8_t feedback_buf_rcv[MAX_MTU]; /* Buffer for feedback recv */
  struct rohc_buf feedback_snd = rohc_buf_init_empty(feedback_buf_snd,MAX_MTU); /* Buffer to store feedback to send */
  struct rohc_buf feedback_rcv = rohc_buf_init_empty(feedback_buf_rcv,MAX_MTU); /* Buffer to store feedback that was received */
  int status;

  /* Fields of rohc_buf
  .time.sec = 0;
  .time.nsec = 0;
  .max_len = MAX_MTU;
  .data = buffer;
  .offset = 0;
  .len = 0;
  */
  
  if (self->decomp == NULL)
  {
    // Decompressor is OFFLINE??
    PyErr_SetString(PyExc_RuntimeError, "Decompressor is not available!");
    return NULL;
  }

  if PyString_Check(buffer)
  {
    // We were passed string, convert to a byte array
    bytearray = PyByteArray_FromObject(buffer);
  }
  else if PyByteArray_Check(buffer)
  {
    bytearray = buffer;
  }
  else
  {
    // Don't know what we got, but we can't use it
    PyErr_SetString(PyExc_ValueError, "Function requires a Python String or Bytearray!");
    return NULL;
  }

  // Start populating the ip_packet info
  rohc_packet.len = PyByteArray_Size(bytearray);
  rohc_packet.max_len = rohc_packet.len;
  if (rohc_packet.len > MAX_MTU)
  {
    // We have a problem! To big a packet, and we don't care to malloc more space (assuming MAX_MTU of 9200) :)
    PyErr_SetString(PyExc_OverflowError, "Packet is to large!");
    return NULL;
  }
  rohc_packet.data = PyByteArray_AsString(bytearray);

  // Right now we don't care about the time properties of the compressor
  rohc_packet.time.sec = 0;
  rohc_packet.time.nsec = 0;

  // No offset for our buffer
  rohc_packet.offset = 0;

  status = rohc_decompress3(self->decomp, rohc_packet, &ip_packet, &feedback_rcv, &feedback_snd);
  // If we received feedback - send it to the compressor!
  if (feedback_rcv.len > 0)
  {
    if(!rohc_comp_deliver_feedback2(self->comp, feedback_rcv))
    {
      PyErr_SetString(PyExc_RuntimeError, "Failed to send feedback to the compressor!!");
      return NULL;
    }
  }
  // If we need to send feedback, keep track of it for the next outbound packet.
  if (feedback_snd.len > 0)
  {
    rohc_buf_append_buf(&self->feedback, feedback_snd);
  }

  if (status == ROHC_STATUS_OK)
  {
    // SUCCESS! - Return the compressed packet
    if (!rohc_buf_is_empty(ip_packet))
      return PyByteArray_FromStringAndSize(ip_packet.data,ip_packet.len);
    // If the above check failed that means we got a segment or feedback only
    // packet, so we just have to wait for the next ROHC packet.  We will
    // Return NONE
  }
  else if (status == ROHC_STATUS_NO_CONTEXT)
  {
    PyErr_SetString(PyExc_RuntimeError, "Decompression of the Packet Failed! (NO CONTEXT)");
    return NULL;
  }
  else if (status == ROHC_STATUS_OUTPUT_TOO_SMALL)
  {
    PyErr_SetString(PyExc_RuntimeError, "Decompression of the Packet Failed! (PACKET TO LARGE)");
    return NULL;
  }
  else if (status == ROHC_STATUS_MALFORMED)
  {
    PyErr_SetString(PyExc_RuntimeError, "Decompression of the Packet Failed! (MALFORMED)");
    return NULL;
  }
  else if (status == ROHC_STATUS_BAD_CRC)
  {
    PyErr_SetString(PyExc_RuntimeError, "Decompression of the Packet Failed! (BAD CRC)");
    return NULL;
  }
  else
  {
    // Failed!
    PyErr_SetString(PyExc_RuntimeError, "Decompression of the Packet Failed! (UNKNOWN)");
    return NULL;
  }
  Py_RETURN_NONE;
}

/* ROHC_last_comp - Return information regarding the last compressed packet. */
static PyObject *
ROHC_last_comp(ROHC *self)
{
  rohc_comp_last_packet_info2_t info;
  bool status;
  PyObject *result;

  /*
  unsigned short  version_major
  unsigned short  version_minor
  unsigned int  context_id
  bool  is_context_init
  rohc_mode_t   context_mode
  rohc_comp_state_t   context_state
  bool  context_used
  int   profile_id
  rohc_packet_t   packet_type
  unsigned long   total_last_uncomp_size
  unsigned long   header_last_uncomp_size
  unsigned long   total_last_comp_size
  unsigned long   header_last_comp_size
  */

  info.version_major = 0;
  info.version_minor = 0;

  status = rohc_comp_get_last_packet_info2(self->comp, &info);
  if (status)
  {
    result = Py_BuildValue("{sisIsOs(Iz)s(Iz)s(kk)s(kk)}",
              "profile_id", info.profile_id,
              "context_id", info.context_id,
              "new_cid",  (info.is_context_init)?Py_True:Py_False,
              "context_mode", info.context_mode, rohc_get_mode_descr(info.context_mode),
              "context_state", info.context_state, rohc_comp_get_state_descr(info.context_state),
              "header_size", info.header_last_uncomp_size, info.header_last_comp_size,
              "packet_size", info.total_last_uncomp_size, info.total_last_comp_size);
    if (result == NULL)
    {
      PyErr_SetString(PyExc_RuntimeError, "Unable to interpret the returned stats!");
      return NULL;
    }
    return result;
  }
  // No stats to return
  Py_RETURN_NONE;
}

/* ROHC_last_decomp - Return information regarding the last decompressed packet. */
static PyObject *
ROHC_last_decomp(ROHC *self)
{
  rohc_decomp_last_packet_info_t info;
  bool status;
  PyObject *result;

  /*
  unsigned short  version_major
  unsigned short  version_minor
  rohc_mode_t   context_mode
  rohc_decomp_state_t   context_state
  int   profile_id
  unsigned long   nr_lost_packets
  unsigned long   nr_misordered_packets
  bool  is_duplicated
  unsigned long   corrected_crc_failures
  unsigned long   corrected_sn_wraparounds
  unsigned long   corrected_wrong_sn_updates
  rohc_packet_t   packet_type
  */

  info.version_major = 0;
  info.version_minor = 1;

  status = rohc_decomp_get_last_packet_info(self->decomp, &info);
  if (status)
  {
    result = Py_BuildValue("{sisOs(Iz)s(Iz)sksksksksk}",
              "profile_id", info.profile_id, 
              "dup_packet", (info.is_duplicated)?Py_True:Py_False,
              "context_mode", info.context_mode, rohc_get_mode_descr(info.context_mode),
              "context_state", info.context_state, rohc_decomp_get_state_descr(info.context_state),
              "lost_packets", info.nr_lost_packets,
              "misordered_packets", info.nr_misordered_packets,
              "crc_corrections", info.corrected_crc_failures,
              "corrected_sn_wraparounds", info.corrected_sn_wraparounds,
              "corrected_wrong_sn_updates", info.corrected_wrong_sn_updates);
    if (result == NULL)
    {
      PyErr_SetString(PyExc_RuntimeError, "Unable to interpret the returned stats!");
      return NULL;
    }
    return result;
  }
  // No stats to return
  Py_RETURN_NONE;
}

/* ROHC_general_info - Return general information regarding the compressor and decompressor. */
static PyObject *
ROHC_general_info(ROHC *self)
{
  rohc_comp_general_info_t comp_info;
  rohc_decomp_general_info_t decomp_info;
  bool status;
  PyObject *result_comp;
  PyObject *result_decomp;
  PyObject *result;

  /*  Comp Info
  unsigned short  version_major
  unsigned short  version_minor
  size_t  contexts_nr
  unsigned long   packets_nr
  unsigned long   uncomp_bytes_nr
  unsigned long   comp_bytes_nr
  */
  /* Decomp Info
  unsigned short  version_major
  unsigned short  version_minor
  size_t  contexts_nr
  unsigned long   packets_nr
  unsigned long   comp_bytes_nr
  unsigned long   uncomp_bytes_nr
  */

  /* TODO - Change this function to accept two booleans?  First for compressor
   * and then for decompressor?  That way we don't check both if the user
   * doesn't want both checked?  This is why the function is broken into the
   * two pieces. */

  comp_info.version_major = 0;
  comp_info.version_minor = 0;
  decomp_info.version_major = 0;
  decomp_info.version_minor = 0;

  status = rohc_comp_get_general_info(self->comp, &comp_info);
  if (status)
  {
    result_comp = Py_BuildValue("{sisks(kk)s(lf)}",
              "contexts", comp_info.contexts_nr,
              "packets", comp_info.packets_nr,
              "bytes", comp_info.uncomp_bytes_nr, comp_info.comp_bytes_nr,
              "reduction", (comp_info.uncomp_bytes_nr - comp_info.comp_bytes_nr),
                           (comp_info.uncomp_bytes_nr > 0)?(1-((float)comp_info.comp_bytes_nr/comp_info.uncomp_bytes_nr)):0
              );
    if (result_comp == NULL)
    {
      PyErr_SetString(PyExc_RuntimeError, "Unable to interpret the returned compressor stats!");
      return NULL;
    }
  }
  else
  {
    Py_INCREF(Py_None);
    result_comp = Py_None;
  }
  status = rohc_decomp_get_general_info(self->decomp, &decomp_info);
  if (status)
  {
    result_decomp = Py_BuildValue("{sisks(kk)s(lf)}",
              "contexts", decomp_info.contexts_nr,
              "packets", decomp_info.packets_nr,
              "bytes", decomp_info.uncomp_bytes_nr, decomp_info.comp_bytes_nr,
              "reduction", (decomp_info.uncomp_bytes_nr - decomp_info.comp_bytes_nr), 
                           (decomp_info.uncomp_bytes_nr > 0)?(1-((float)decomp_info.comp_bytes_nr/decomp_info.uncomp_bytes_nr)):0
              );
    if (result_decomp == NULL)
    {
      PyErr_SetString(PyExc_RuntimeError, "Unable to interpret the returned decompressor stats!");
      if (result_comp != NULL)
        Py_DECREF(result_comp);
      return NULL;
    }
  }
  else
  {
    Py_INCREF(Py_None);
    result_decomp = Py_None;
  }
  result = Py_BuildValue("(sN)(sN)",
            "compressor", result_comp, "decompressor", result_decomp);
  return result;
}

/* declare methods to python */
static PyMethodDef ROHC_methods[] = {
    {"clear", (PyCFunction)ROHC_clear, METH_NOARGS, 
        "Clear ROHC to the defaults, creating a new instance"},
    {"reset", (PyCFunction)ROHC_reset, METH_NOARGS, 
        "Hard Reset of the current ROHC, new instance and reinit the previous active profiles."},
    {"reinit", (PyCFunction)ROHC_reinit, METH_NOARGS, 
        "Force the compressor to re-initialize all its contexts."},
    {"activate_profiles", (PyCFunction)ROHC_activate_profiles, METH_VARARGS, 
        "Identify list of profiles (as strings) to activate for both compressor and decompressor."},
    {"feedback_to_send", (PyCFunction)ROHC_feedback_to_send, METH_NOARGS, 
        "Simple test that returns true if there is feedback that is waiting to be sent."},
    {"get_feedback", (PyCFunction)ROHC_get_feedback, METH_NOARGS, 
        "Get any pending feedback data to send without compressing a packet."},
    {"compress", (PyCFunction)ROHC_compress, METH_O, 
        "Compress a Single Packet (will automatically append feedback)"},
    {"decompress", (PyCFunction)ROHC_decompress, METH_O, 
        "Decompress a Single ROHC Packet"},
    {"last_compressed_info", (PyCFunction)ROHC_last_comp, METH_NOARGS, 
        "Return information regarding the last compressed packet."},
    {"last_decompressed_info", (PyCFunction)ROHC_last_decomp, METH_NOARGS, 
        "Return information regarding the last decompressed packet."},
    {"general_info", (PyCFunction)ROHC_general_info, METH_NOARGS, 
        "Return general information regarding the compressor and decompressor."},
    {NULL, NULL, 0, NULL}  /* Sentinel */
};

/* number object operators */
static PyNumberMethods ROHCOperators = {
    0,                                           /* nb_add */
    0,                                           /* nb_subtract */
    0,                                           /* nb_multiply */
    0,                                           /* nb_divide */
    0,                                           /* nb_remainder */
    0,                                           /* nb_divmod */
    0,                                           /* nb_power */
    0,                                           /* nb_negative */
    0,                                           /* nb_positive */
    0,                                           /* nb_absolute */
    0,                                           /* nb_nonzero / nb_bool */
    0,                                           /* nb_invert */
    0,                                           /* nb_lshift */
    0,                                           /* nb_rshift */
    0,                                           /* nb_and */
    0,                                           /* nb_xor */
    0,                                           /* nb_or */
    0,                                           /* nb_coerce */
    0,                                           /* nb_int */
    0,                                           /* nb_long */
    0,                                           /* nb_float */
    0,                                           /* nb_oct */
    0,                                           /* nb_hex */
    0,                                           /* nb_inplace_add */
    0,                                           /* nb_inplace_subtract */
    0,                                           /* nb_inplace_multiply */
    0,                                           /* nb_inplace_divide */
    0,                                           /* nb_inplace_remainder */
    0,                                           /* nb_inplace_power */
    0,                                           /* nb_inplace_lshift */
    0,                                           /* nb_inplace_rshift */
    0,                                           /* nb_inplace_and */
    0,                                           /* nb_inplace_xor */
    0,                                           /* nb_inplace_or */
    0,                                           /* nb_floor_divide */
    0,                                           /* nb_true_divide */
    0,                                           /* nb_inplace_floor_divide */
    0,                                           /* nb_inplace_true_divide */
    0,                                           /* nb_index */
};

static PyTypeObject ROHCType = {
    PyObject_HEAD_INIT(NULL)
    0,                         /*ob_size*/
    "rohc.ROHC",             /*tp_name*/
    sizeof(ROHC), /*tp_basicsize*/
    0,                         /*tp_itemsize*/
    (destructor)ROHC_dealloc,   /*tp_dealloc*/
    0,                         /*tp_print*/
    0,                         /*tp_getattr*/
    0,                         /*tp_setattr*/
    0,                         /*tp_compare*/
    0,                         /*tp_repr*/
    &ROHCOperators,    /*tp_as_number*/
    0,                         /*tp_as_sequence*/
    0,                         /*tp_as_mapping*/
    0,                         /*tp_hash */
    0,                         /*tp_call*/
    0,                         /*tp_str*/
    0,                         /*tp_getattro*/
    0,                         /*tp_setattro*/
    0,                         /*tp_as_buffer*/
    Py_TPFLAGS_DEFAULT | Py_TPFLAGS_BASETYPE | Py_TPFLAGS_CHECKTYPES,
    "ROHC Object",           /* tp_doc */
    0,                     /* tp_traverse */
    0,                     /* tp_clear */
    0,                     /* tp_richcompare */
    0,                     /* tp_weaklistoffset */
    0,                     /* tp_iter */
    0,                     /* tp_iternext */
    ROHC_methods,             /* tp_methods */
    ROHC_members,             /* tp_members */
    0,                         /* tp_getset */
    0,                         /* tp_base */
    0,                         /* tp_dict */
    0,                         /* tp_descr_get */
    0,                         /* tp_descr_set */
    0,                         /* tp_dictoffset */
    (initproc)ROHC_init,      /* tp_init */
    0,                         /* tp_alloc */
    (void *)ROHC_new,                 /* tp_new */
};

static PyMethodDef module_methods[] = {
    {NULL, NULL, 0, NULL} /* Sentinel */
};

#ifndef PyMODINIT_FUNC  /* declarations for DLL import/export */
#define PyMODINIT_FUNC void
#endif
PyMODINIT_FUNC
initrohc(void) 
{
    PyObject* m;

    if (PyType_Ready(&ROHCType) < 0)
        return;

    m = Py_InitModule3("rohc", module_methods,
                       "ROHC Object base type.");

    if (m == NULL)
        return;

    Py_INCREF(&ROHCType);
    PyModule_AddObject(m, "ROHC", 
        (PyObject *)&ROHCType);
}

