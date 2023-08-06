Version 0.5.1:  December 4, 2015
===============================================================================

pRESTO is a toolkit for processing raw reads from high-throughput sequencing 
of lymphocyte repertoires. Dramatic improvements in high-throughput sequencing 
technologies now enable large-scale characterization of immunoglobulin 
repertoires, defined as the collection of trans-membrane antigen-receptor 
proteins located on the surface of T and B lymphocytes. The REpertoire 
Sequencing TOolkit (pRESTO) is composed of a suite of utilities to handle all 
stages of sequence processing prior to germline segment assignment. pRESTO is 
designed to handle either single reads or paired-end reads. It includes 
features for quality control, primer masking, annotation of reads with sequence 
embedded barcodes, generation of single-molecule consensus sequences, assembly 
of paired-end reads and identification of duplicate sequences. Numerous options 
for sequence sorting, sampling and conversion operations are also included.


Requirements
-------------------------------------------------------------------------------

* [Python 3.4.0](http://python.org)
* [setuptools 2.0](http://bitbucket.org/pypa/setuptools)
* [NumPy 1.8](http://numpy.org)
* [SciPy 0.14](http://scipy.org)
* [pandas 0.15](http://pandas.pydata.org)
* [Biopython 1.65](http://biopython.org)
* [MUSCLE v3.8](http://www.drive5.com/muscle)
* [USEARCH v7.0](http://www.drive5.com/usearch)


Installation - Linux
-------------------------------------------------------------------------------

1. The simplest way to install all Python dependencies is to install the full 
   SciPy stack using the [instructions](http://scipy.org/install.html), then 
   install Biopython according to its 
   [instructions](http://biopython.org/DIST/docs/install/Installation.html).

2. Extract the pRESTO bundle and run:  
   `> python3 setup.py install --user`


Installation - Windows
-------------------------------------------------------------------------------

1. Install Python 3.4.0+ from [Python](http://python.org/downloads), selecting
   both the options 'pip' and 'Add python.exe to Path'.

2. Install NumPy, SciPy, pandas and Biopython using the packages available from 
   the [Unofficial Windows binary](http://www.lfd.uci.edu/~gohlke/pythonlibs)
   collection.

3. Unzip the pRESTO bundle, open a Command Prompt, change directories to the
   pRESTO folder, and run:  
   `> python setup.py install`.
   
4. For a default installation of Python 3.4, the pRESTO scripts will be 
   installed into `C:\Python34\Scripts` and should be directly executable from 
   the Command Prompt. If this is not the case, then follow step 5 below.
   
5. Add both the `C:\Python34` and `C:\Python34\Scripts` directories to your 
   `%Path%`. On Windows 7 the `%Path%` setting is located under Control Panel 
    -> System and Security -> System -> Advanced System Settings -> 
    Environment variables -> System variables -> Path.
   

Installation - Mac OS X
-------------------------------------------------------------------------------

1. Install Xcode 3.2.6
   Available from the Apple store or 
   [developer downloads](http://developer.apple.com/downloads).
   If you have a newer version (eg, Xcode 4.6.3) that will work also,
   but Xcode 3 is free of charge.  If Xcode fails to install with an
   "Unknown Error", change the date on your system to some time in 2011,
   install Xcode, and then change the date back to the proper setting.

2. Install XQuartz 2.7.5
   Available from the [XQuartz project](http://xquartz.macosforge.org/landing).

3. Install Homebrew
   Follow the installation and post-installation [instructions](http://brew.sh).

4. Open a terminal and install gfortran (required for SciPy) using Homebrew
   (this can take an hour to install):  
   `> brew install gfortran`  
   If the above fails run this instead:  
   `> brew install --env=std gfortran`
   
5. Install Python 3.4.0+ and set the path to the python3 executable:  
   `> brew install python3`  
   `> echo 'export PATH=/usr/local/bin:$PATH' >> ~/.profile`  
   Exit and reopen the terminal application so the PATH setting takes effect

6. Install NumPy, SciPy, pandas and Biopyton using the Python package manager:  
   `> pip3 install numpy scipy pandas biopython`
   
7. Extract the pRESTO bundle, open a terminal window, change directories to 
   the pRESTO folder, and run:  
   `> python3 setup.py install`
