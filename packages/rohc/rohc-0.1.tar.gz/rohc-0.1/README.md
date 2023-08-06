# rohc_python
Experimental Python bindings for the ROHC library

Joseph Ishac - jishac@nasa.gov

ROHC Library found at https://rohc-lib.org/

This extension is written in C and tries to simplify the interface.  Feedback still needs to be handled manually if traffic is unidirectional.

Example:

```python
hc = rohc.ROHC(True)
hc.activate_profiles(["IP","UDP"])

# Get an IP packet to compress and store it in ip_data
data_to_send = hc.compress(ip_data)
hc_info = hc.last_compressed_info()

# Receive a compressed packet from a different compressor
decompressed_pkt = hc.decompress(rohc_pkt)
hc_info = hc.last_decompressed_info()

# Show available general stats from the ROHC library
hc_info = hc.general_info()

# Feedback is "piggybacked"
# However, for unidirectional traffic you will need to check
#  for feedback manually and send it out

# Check for feedback
if hc.feedback_to_send():
  # Get the feedback
  feedback_data = hc.get_feedback()
  # Send the feedback over the link

# Finally a few other calls are available
hc.reinit() # Calls rohc_comp_force_contexts_reinit of the ROHC library
hc.clear()  # This function simply re-initializes the object
hc.reset()  # Similar to clear except the previous profiles are reinstated 
```
