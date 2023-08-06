clewareADC
==========

.. contents::

Description
-----------
An unofficial Python interface for the `Cleware USB-ADC 2 <http://www.cleware-shop.de/USB-ADC2>`_ utilizing
`cython-hidapi <https://github.com/gbishop/cython-hidapi>`_.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

License
-------
clewareADC is provided under the MIT license (see LICENSE).

Install
-------

1. Download clewareADC::

    git clone https://github.com/d4rkforce/clewareADC.git
    cd clewareADC

2. Install using setuptools::

    python setup.py install

Usage
-----
The folowing code will list all connected USB-ADC 2 devices, connect to the first device it finds
and print ten values from both channels, scaled by 13.621V:

.. code:: python

    import time
    from clewareADC import ClewareADC

    deviceList = ClewareADC.listDevices()
    if len(deviceList) < 1:
        raise Exception('No ADCs found')

    for device in deviceList:
        print('Found ADC at {} with serial number {}'.format(device[0], device[1]))
    print('')

    with ClewareADC(13.621, deviceList[0][1]) as adc:
        print('Reading from ADC {} with 13.621V scaling:'.format(deviceList[0][1]))

        for i in range(10):
            ch0 = adc.readChannel(0)
            ch1 = adc.readChannel(1)
            print('  Ch 0: {}V, Ch 1: {}V'.format(ch0, ch1))
            time.sleep(1.00)

