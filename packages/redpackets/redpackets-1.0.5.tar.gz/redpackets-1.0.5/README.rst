==========
redpackets
==========

RedPackets Split & Return split_list if succeed & Raise Exception if failed

Installation
============

::

    pip install redpackets


Usage
=====

::

    import redpackets

    redpackets.split_dollor(total, num, min=0.01):

    redpackets.split_cent(total, num, min=0.01):

    # cent=False equals split_dollor
    # cent=True equals split_cent
    redpackets.split(total, num, min=None, cent=False)

    redpackets.cent(dollar, rate=100)

    redpackets.dollor(cent, rate=100)

