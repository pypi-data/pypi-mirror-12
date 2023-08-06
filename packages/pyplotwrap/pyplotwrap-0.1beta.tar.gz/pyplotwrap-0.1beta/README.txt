# python_plot_wrappers
A wrapper for making polished multi-line plots with matplotlib. 
I wrote this as an easy-to-access interface to make cleaner looking plot code, and not have to retype 
pyplot syntax over and over. Allows for passing data in as nested dictionaries. 
All lines are created using a single x-axis data set - essentially a setup to visualize parametric sweeps.

See sample images by following links below:

https://cloud.githubusercontent.com/assets/15716194/11058820/7b1098be-8763-11e5-91d6-53bd5d71437a.png

https://cloud.githubusercontent.com/assets/15716194/11058821/7b109788-8763-11e5-9c2c-ceb7db39b980.png

Pre-requisites:
python + matplotlib, numpy, scipy, latex + texlive-fonts-extra, (and maybe texlive-full)

Usage: 

plot_wrapper(plot_data, keys, labels, save_folder)

Instructions:

plot_data   : 
Dictionary (level 1) that contains multiple  (level 2) dictionaries. 
Each level 2 dictionary corresponds to a line in the figure(s), and must have the following key/value pairs:

              data['x']      = x                 # list of x-axis values to be plotted

              data['xlbl']   = 'X axis  label'   # string defining x-axis label

              data['lstyle'] = '-'               # line style. can be '--', '-', '-.' or ':'. Recommend first 2

              data['mtype']  = 's'               # Marker type for line. Recommend 's','o','^' or '' for none

              data['keyname']= y                 # data to be plotted on the y axis

              data['lcolor'] = 'r'               # line color. Can be 'r', 'b', 'k', 'm',.... 
              

keys        : list of data keys in the level-2 dictionaries that need to be plotted. If multiple level-2 dictionaries havedata under the same key name, these data sets are plotted on the same figure.

labels      : y-axis labels (list of strings) that are applied to the y-axis label for each figure, corresponding to entries in the list "keys". If keys and labels are of different lengths, the shorter list is used to generate figures since I used the zip function.
              
save_folder : path where you want to save all images. Right now uses png format. 

Feel free to modify/add.
