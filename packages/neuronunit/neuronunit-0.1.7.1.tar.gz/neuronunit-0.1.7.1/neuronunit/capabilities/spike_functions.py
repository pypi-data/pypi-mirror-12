"""A module of auxiliary helper functions, not capabilities."""

import numpy as np
import neo
from elephant.spike_train_generation import threshold_detection
from quantities import mV, ms

def get_spike_train(vm, threshold=0.0*mV):
	""" 
	 vm: a neo.core.AnalogSignal corresponding to a membrane potential trace.   
	 threshold: the value (in mV) above which vm has to cross for there 
	 			to be a spike.  Scalar float.  
	Returns:
	 a neo.core.SpikeTrain containing the times of spikes.  
	"""
	spike_train = threshold_detection(vm,threshold=threshold)
	return spike_train

# Membrane potential trace (1D numpy array) to matrix of spike snippets (2D numpy array)
def get_spike_waveforms(vm, threshold=0.0*mV, width=10*ms): 
	""" 
	 vm: a neo.core.AnalogSignal corresponding to a membrane potential trace.   
	 threshold: the value (in mV) above which vm has to cross for there 
	 			to be a spike.  Scalar float.  
	 width: the length (in ms) of the snippet extracted, 
	 		centered at the spike peak.  
	
	Returns:
	 a neo.core.AnalogSignalArray of membrane potential snippets 
	 corresponding to each spike.  
	"""
	spike_train = threshold_detection(vm,threshold=threshold)

	# Fix for 0-length spike train issue in elephant.  
	try:
		len(spike_train)
	except TypeError:
		spike_train = neo.core.SpikeTrain([],t_start=spike_train.t_start,
											 t_stop=spike_train.t_stop,
											 units=spike_train.units)
	
	vm_array = neo.core.AnalogSignalArray(vm,units=vm.units,
											 sampling_rate=vm.sampling_rate)
	snippets = [vm_array.time_slice(t-width/2,t+width/2) for t in spike_train]
	return neo.core.AnalogSignalArray(snippets,units=vm.units,
											   sampling_rate=vm.sampling_rate)

def spikes2amplitudes(spike_waveforms):
	""" 
	IN:
	 spike_waveforms: Spike waveforms, e.g. from get_spike_waveforms(). 
	 	neo.core.AnalogSignalArray
	OUT:
	 1D numpy array of spike amplitudes, i.e. the maxima in each waveform.     
	"""

	return np.max(spike_waveforms,axis=1)

def spikes2widths(spike_waveforms):
	""" 
	IN:
	 spike_waveforms: Spike waveforms, e.g. from get_spike_waveforms(). 
	 	neo.core.AnalogSignalArray    
	OUT:
	 1D numpy array of spike widths, specifically the full width 
	 at half the maximum amplitude.     
	"""
	n_spikes = len(spike_waveforms)
	widths = []
	#print("There are %d spikes" % n_spikes)
	for i,s in enumerate(spike_waveforms):
		#print("This spikes has duration %d samples" % len(spike))
		x_high = int(np.argmax(s))
		#print(("Spikes has duration %d samples, "
		#	   "and sample %d is the high point" % \
		#	   (len(s),x_high)))
		high = s[x_high]
		if x_high > 0:
			low = np.min(s[:x_high])
			mid = (high+low)/2
			n_samples = sum(s>mid) # Number of samples above the half-max.  
			widths.append(n_samples)
	if n_spikes:
		widths *= s.sampling_period # Convert from samples to time.  
	#print("Spike widths are %s" % str(widths))
	return widths