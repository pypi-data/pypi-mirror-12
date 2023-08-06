# Support Python 2 and 3
from __future__ import unicode_literals
from __future__ import absolute_import
from __future__ import print_function

import struct
import imghdr

def get_image_size(fname):
    try:
        w,h = get_image_size_int(fname)
    except:
        w,h = 0,0
    return w,h
    
def get_image_size_int(fname):
    '''Determine the image type of fhandle and return its size.
    from draco'''
    with open(fname, 'rb') as fhandle:
        head = fhandle.read(24)
        if len(head) != 24:
            return
        if imghdr.what(fname) == 'png':
            check = struct.unpack('>i', head[4:8])[0]
            if check != 0x0d0a1a0a:
                return
            width, height = struct.unpack('>ii', head[16:24])
        elif imghdr.what(fname) == 'gif':
            width, height = struct.unpack('<HH', head[6:10])
        elif imghdr.what(fname) == 'jpeg':
            try:
                fhandle.seek(0) # Read 0xff next
                size = 2
                ftype = 0
                while not 0xc0 <= ftype <= 0xcf:
                    fhandle.seek(size, 1)
                    byte = fhandle.read(1)
                    while ord(byte) == 0xff:
                        byte = fhandle.read(1)
                    ftype = ord(byte)
                    size = struct.unpack('>H', fhandle.read(2))[0] - 2
                # We are at a SOFn block
                fhandle.seek(1, 1)  # Skip `precision' byte.
                height, width = struct.unpack('>HH', fhandle.read(4))
            except Exception: #IGNORE:W0703
                return
        else:
            return
        return width, height

if __name__ == '__main__':
    with open('./templates/sysMass_vs_vol_Ptank.png', 'rb') as f:
        data = f.read()

    print()
    for img in ['sysMass_vs_vol_Ptank.png', 'delta_rocket.jpg', 'IROBOT2.GIF', 'Pressure_1T_Spin.gif']:
        w,h = get_image_size('./templates/%s'%img)
        print ('%30s'%img,  'width=%i, height=%i'%(w,h)  )
    
    
    