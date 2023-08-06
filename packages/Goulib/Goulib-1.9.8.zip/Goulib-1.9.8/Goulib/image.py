#!/usr/bin/env python
# coding: utf8
"""
image processing and conversion
:requires:
* `PIL of Pillow <http://pypi.python.org/pypi/pillow/>`_
"""

__author__ = "Philippe Guglielmetti"
__copyright__ = "Copyright 2015, Philippe Guglielmetti"
__credits__ = ['Brad Montgomery http://bradmontgomery.net']
__license__ = "LGPL"

import six
from PIL import Image as PilImage# or Pillow
import numpy
import math

from . import math2

class Image(PilImage.Image):
    def __init__(self, source):
        if isinstance(source,six.string_types):
            self.path=source
            source=PilImage.open(self.path)
        self.im = source.im
        self.mode = source.mode
        self.size = source.size
        self.palette = source.palette
        self.info = source.info
        self.category = source.category
        self.readonly = source.readonly
        self.pyaccess = source.pyaccess
        self.hash=None
        
    def __repr__(self):
        return "<%s.%s image mode=%s size=%dx%d hash=%s at %s>" % (
            self.__class__.__module__, self.__class__.__name__,
            self.mode, self.size[0], self.size[1],
            self.hash, self.path,
        )
        
    def average_hash(self, hash_size=8):
        """
        Average Hash computation
        Implementation follows http://www.hackerfactor.com/blog/index.php?/archives/432-Looks-Like-It.html
        """
        # https://github.com/JohannesBuchner/imagehash/blob/master/imagehash/__init__.py
        image = self.convert("L").resize((hash_size, hash_size), Image.ANTIALIAS)
        pixels = numpy.array(image.getdata()).reshape((1,hash_size*hash_size))[0]
        avg = pixels.mean()
        diff = pixels > avg
        return math2.num_from_digits(diff,2)
        
    def __hash__(self):
        if self.hash is None:
            self.hash=self.average_hash()
        return self.hash
    
    def same(self,other):
        return hash(self)==hash(other)
    
    def surf(self):
        return self.size[0]*self.size[1]
    
    """comparison operators on SIZE ONLY"""
    def __eq__(self,other):
        return self.size==other.size
    
    def __lt__(self, other):
        """smaller"""
        return self.surf()<other.surf()
    
    def b64encode(self, fmt='PNG'):
        """
        :param img: :class:`PIL:Image`
        :result: string base64 encoded image content in specified format
        :see: http://stackoverflow.com/questions/14348442/django-how-do-i-display-a-pil-image-object-in-a-template
        """
        import io, base64
        output = io.StringIO()
        self.save(output, fmt)
        output.seek(0)
        output_s = output.read()
        return base64.b64encode(output_s)
        
#some useful numpy functions first

def normalize(X, norm='max', axis=0, copy=True, positive=True):
    """Scale input vectors individually to unit norm (vector length).
    
    borrowed from http://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.normalize.html
    (support for sparse matrices removed, default values changed, positive added)
    
    Parameters
    ----------
    X : array or scipy.sparse matrix with shape [n_samples, n_features]
        The data to normalize, element by element.
    norm : 'l1', 'l2', or 'max', optional ('max' by default)
        The norm to use to normalize each non zero sample (or each non-zero
        feature if axis is 0).
    axis : 0 or 1, optional (0 by default)
        axis used to normalize the data along. If 1, independently normalize
        each sample, otherwise (if 0) normalize each feature.
    copy : boolean, optional, default True
        set to False to perform inplace
    """
        
    if norm == 'l1':
        norms = numpy.abs(X).sum(axis=axis)
    elif norm == 'l2':
        norms = numpy.einsum('ij,ij->i', X, X) # http://ajcr.net/Basic-guide-to-einsum/
    elif norm == 'max':
        norms = numpy.max(X, axis=axis)
    else:
        raise ValueError("'%s' is not a supported norm" % norm)

    X /= norms[:, numpy.newaxis]

    if axis == 0:
        X = X.T

    return X

def pil2array(im):
    ''' Convert a PIL image to a numpy ndarray '''
    data = list(im.getdata())
    w,h = im.size
    A = numpy.zeros((w*h), 'd')
    i=0
    for val in data:
        A[i] = val
        i=i+1
    A=A.reshape(w,h)
    return A

def array2pil(A,mode='L'):
    ''' Convert a numpy ndarray to a PIL image.
        Only grayscale images (PIL mode 'L') are supported.
    '''
    w,h = A.shape
    # make sure the array only contains values from 0-255
    # if not... fix them.
    if A.max() > 255 or A.min() < 0: 
        A = normalize(A) # normalize between 0-1
        A = A * 255 # shift values to range 0-255
    if A.min() >= 0.0 and A.max() <= 1.0: # values are already between 0-1
        A = A * 255 # shift values to range 0-255
    A = A.flatten()
    data = []
    for val in A:
        if val is numpy.nan: val = 0 
        data.append(int(val)) # make sure they're all int's
    im = Image.new(mode, (w,h))
    im.putdata(data)
    return im

def correlation(input, match):
    """Compute the correlation between two, single-channel, grayscale input images.
    The second image must be smaller than the first.
    :param input: a PIL Image 
    :para, match: the PIL image we're looking for in input
    """
    input = pil2array(input)
    match = pil2array(match)
    
    assert match.shape < input.shape, "Match Template must be Smaller than the input"
    c = numpy.zeros(input.shape) # store the coefficients...
    mfmean = match.mean()
    iw, ih = input.shape # get input image width and height
    mw, mh = match.shape # get match image width and height
    

    for i in range(0, iw):
        for j in range(0, ih):

            # find the left, right, top 
            # and bottom of the sub-image
            if i-mw/2 <= 0:
                left = 0
            elif iw - i < mw:
                left = iw - mw
            else:
                left = i
                
            right = left + mw 

            if j - mh/2 <= 0:
                top = 0
            elif ih - j < mh:
                top = ih - mh
            else:
                top = j

            bottom = top + mh

            # take a slice of the input image as a sub image
            sub = input[left:right, top:bottom]
            assert sub.shape == match.shape, "SubImages must be same size!"
            localmean = sub.mean()
            temp = (sub - localmean) * (match - mfmean)
            s1 = temp.sum()
            temp = (sub - localmean) * (sub - localmean)
            s2 = temp.sum()
            temp = (match - mfmean) * (match - mfmean)
            s3 = temp.sum() 
            denom = s2*s3
            if denom == 0: 
                temp = 0
            else: 
                temp = s1 / math.sqrt(denom)
            
            c[i,j] = temp
    return array2pil(c)

#from http://stackoverflow.com/questions/9166400/convert-rgba-png-to-rgb-with-pil

def alpha_to_color(image, color=(255, 255, 255)):
    """Set all fully transparent pixels of an RGBA image to the specified color.
    This is a very simple solution that might leave over some ugly edges, due
    to semi-transparent areas. You should use alpha_composite_with color instead.

    Source: http://stackoverflow.com/a/9166671/284318

    Keyword Arguments:
    image -- PIL RGBA Image object
    color -- Tuple r, g, b (default 255, 255, 255)

    """ 
    x = numpy.array(image)
    r, g, b, a = numpy.rollaxis(x, axis=-1)
    r[a == 0] = color[0]
    g[a == 0] = color[1]
    b[a == 0] = color[2] 
    x = numpy.dstack([r, g, b, a])
    return Image.fromarray(x, 'RGBA')


def alpha_composite(front, back):
    """Alpha composite two RGBA images.

    Source: http://stackoverflow.com/a/9166671/284318

    Keyword Arguments:
    front -- PIL RGBA Image object
    back -- PIL RGBA Image object
    
    The algorithm comes from http://en.wikipedia.org/wiki/Alpha_compositing

    """
    front = numpy.asarray(front)
    back = numpy.asarray(back)
    result = numpy.empty(front.shape, dtype='float')
    alpha = numpy.index_exp[:, :, 3:]
    rgb = numpy.index_exp[:, :, :3]
    falpha = front[alpha] / 255.0
    balpha = back[alpha] / 255.0
    result[alpha] = falpha + balpha * (1 - falpha)
    old_setting = numpy.seterr(invalid='ignore')
    result[rgb] = (front[rgb] * falpha + back[rgb] * balpha * (1 - falpha)) / result[alpha]
    numpy.seterr(**old_setting)
    result[alpha] *= 255
    numpy.clip(result, 0, 255)
    # astype('uint8') maps numpy.nan and numpy.inf to 0
    result = result.astype('uint8')
    result = Image.fromarray(result, 'RGBA')
    return result


def alpha_composite_with_color(image, color=(255, 255, 255)):
    """Alpha composite an RGBA image with a single color image of the
    specified color and the same size as the original image.

    Keyword Arguments:
    image -- PIL RGBA Image object
    color -- Tuple r, g, b (default 255, 255, 255)

    """
    back = Image.new('RGBA', size=image.size, color=color + (255,))
    return alpha_composite(image, back)

'''
def pure_pil_alpha_to_color(image, color=(255, 255, 255)):
    """Alpha composite an RGBA Image with a specified color.

    NOTE: This version is much slower than the
    alpha_composite_with_color solution. Use it only if
    numpy is not available.

    Source: http://stackoverflow.com/a/9168169/284318

    Keyword Arguments:
    image -- PIL RGBA Image object
    color -- Tuple r, g, b (default 255, 255, 255)

    """ 
    def blend_value(back, front, a):
        return (front * a + back * (255 - a)) / 255

    def blend_rgba(back, front):
        result = [blend_value(back[i], front[i], front[3]) for i in (0, 1, 2)]
        return tuple(result + [255])

    im = image.copy()  # don't edit the reference directly
    p = im.load()  # load pixel array
    for y in range(im.size[1]):
        for x in range(im.size[0]):
            p[x, y] = blend_rgba(color + (255,), p[x, y])

    return im
'''
def pure_pil_alpha_to_color(image, color=(255, 255, 255)):
    """Alpha composite an RGBA Image with a specified color.

    Simpler, faster version than the solutions above.

    Source: http://stackoverflow.com/a/9459208/284318

    Keyword Arguments:
    image -- PIL RGBA Image object
    color -- Tuple r, g, b (default 255, 255, 255)

    """
    image.load()  # needed for split()
    background = Image.new('RGB', image.size, color)
    background.paste(image, mask=image.split()[3])  # 3 is the alpha channel
    return background

def img2base64(image, fmt='PNG'):
    """
    :param image: :class:`PIL:Image`
    :result: string base64 encoded image content in specified format
    :see: http://stackoverflow.com/questions/14348442/django-how-do-i-display-a-pil-image-object-in-a-template
    """
    return image.b64encode(fmt)

def average_hash(image, hash_size=8):
    """
    Average Hash computation
    Implementation follows http://www.hackerfactor.com/blog/index.php?/archives/432-Looks-Like-It.html
    @image must be a PIL instance.
    """
    return Image(image).average_hash(hash_size)


 