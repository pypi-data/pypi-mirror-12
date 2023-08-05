from __future__ import division
import string
from time import gmtime, strftime

try:
    import xml.etree.cElementTree as ET
except ImportError:
    import xml.etree.ElementTree as ET
import os.path
from refnx.dataset import Data1D


class ReflectDataset(Data1D):
    """
    A 1D Reflectivity dataset.
    """
    _template_ref_xml = """<?xml version="1.0"?>
    <REFroot xmlns="">
    <REFentry time="$time">
    <Title>$title</Title>
    <User>$user</User>
    <REFsample>
    <ID>$sample</ID>
    </REFsample>
    <REFdata axes="Qz" rank="1" type="POINT" spin="UNPOLARISED" dim="$numpoints">
    <Run filename="$datafilenumber" preset="" size="">
    </Run>
    <R uncertainty="dR">$_ydata</R>
    <Qz uncertainty="dQz" units="1/A">$_xdata</Qz>
    <dR type="SD">$_ydataSD</dR>
    <dQz type="_FWHM" units="1/A">$_xdataSD</dQz>
    </REFdata>
    </REFentry>
    </REFroot>"""

    def __init__(self, data_tuple=None, **kwds):
        """
        Initialise a reflectivity dataset.

        Parameters
        ----------
        data_tuple : tuple of np.ndarray
            Specify the Q, R, dR, dQ data to construct the dataset from.
        """
        super(ReflectDataset, self).__init__(data_tuple=data_tuple)
        self.datafilenumber = list()
        self.sld_profile = None

    def save_xml(self, f):
        """
        Saves the reflectivity data to an XML file.

        Parameters
        ----------
        f : file-like
            The file to save the data to.
        """
        s = string.Template(self._template_ref_xml)
        self.time = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

        # filename = 'c_PLP{:07d}_{:d}.xml'.format(self._rnumber[0], 0)

        self._ydata = repr(self.y.tolist()).strip(',[]')
        self._xdata = repr(self.x.tolist()).strip(',[]')
        self._ydataSD = repr(self.y_sd.tolist()).strip(',[]')
        self._xdataSD = repr(self.x_sd.tolist()).strip(',[]')

        thefile = s.safe_substitute(self.__dict__)
        f.write(thefile)

    def load(self, f):
        """
        Load a dataset from file. Can either be 2-4 column ascii or XML file.

        Parameters
        ----------
        f : str or file-like
            File to load reflectivity data from.
        """
        own_fh = None
        g = f
        if not hasattr(f, 'read'):
            own_fh = open(f, 'rb')
            g = own_fh
        try:
            tree = ET.ElementTree()
            tree.parse(g)
            qtext = tree.find('.//Qz')
            rtext = tree.find('.//R')
            drtext = tree.find('.//dR')
            dqtext = tree.find('.//dQz')

            qvals = [float(val) for val in qtext.text.split()]
            rvals = [float(val) for val in rtext.text.split()]
            drvals = [float(val) for val in drtext.text.split()]
            dqvals = [float(val) for val in dqtext.text.split()]

            self.filename = f.name
            self.name = os.path.splitext(os.path.basename(f.name))[0]
            self.data = (qvals, rvals, drvals, dqvals)
            self.filename = f.name
        except ET.ParseError:
            g.seek(0)
            super(ReflectDataset, self).load(g)
        finally:
            if own_fh is not None:
                own_fh.close()