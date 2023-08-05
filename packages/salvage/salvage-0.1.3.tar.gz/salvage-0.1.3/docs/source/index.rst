Salvage
=======

.. include:: ../../README.rst


Choosing Parameters
-------------------

Salvage is designed to accomplish two somewhat competing goals: to minimize the
risk both of disclosing and of losing some data. Given:

    * :math:`n \equiv` the total number of participants or shares.
    * :math:`t \equiv` the number of shares required to recover the data (the
      threshold).
    * :math:`t' = n - t + 1 \equiv` the number of shares that must be lost to
      lose the data.
    * :math:`p_d \equiv` the chance of disclosing any given share.
    * :math:`p_l \equiv` the chance of losing any given share.

We can calculate the chances of disclosure or loss of the original data as:

    * :math:`p_{disc} = 1 - (1 - p_d^t)^\binom{n}{t}`
    * :math:`p_{loss} = 1 - (1 - p_l^{t'})^\binom{n}{t'}`

High values of :math:`t` will give you a very low :math:`p_{disc}`, but
:math:`p_{loss}` could easily exceed :math:`p_l` itself. Very low values of
:math:`t` will do the reverse. Unless you're far more concerned with one over
the other, :math:`t` should typically be 40-60% of :math:`n`.


Calculator
~~~~~~~~~~

.. raw:: html

    <table id="parameters">
        <tbody>
            <tr>
                <td>Participants:</td>
                <td><span id="n-display"></span></td>
                <td><div id="n-slider"></div></td>
            </tr>
            <tr>
                <td>Threshold:</td>
                <td><span id="t-display"></span></td>
                <td><div id="t-slider"></div></td>
            </tr>
        </tbody>
    </table>

    <table id="probabilities">
        <tbody>
            <tr>
                <td><label for="p_d">Chance of disclosing one share:</label></td>
                <td><input id="p_d" name="p_d"></input> %</td>
                <td>Chance of disclosing secure data:</td>
                <td><span id="p_disc"></span>%</td>
            </tr>
            <tr>
                <td><label for="p_l">Chance of losing one share:</label></td>
                <td><input id="p_l" name="p_l"></input> %</td>
                <td>Chance of losing secure data:</td>
                <td><span id="p_loss"></span>%</td>
            </tr>
        </tbody>
    </table>


Practical Considerations
------------------------

The risks of disclosure and loss can never be entirely eliminated, but there are
several things that can be done to further reduce them.


Avoiding Disclosure
~~~~~~~~~~~~~~~~~~~

This is the easier one, as all of the usual rules apply. Each share of a salvage
kit should be handled as if it were the raw data. Ideally, it will only exist on
physical media and be stored like any other valuable and sensitive document. You
can always apply extra protection to each share, such as encrypting it with the
public key of the intended recipient.

Depending on your level of paranoia, you might also give some thought to how you
prepare the kit. In order to create it, you need to have the original
information assembled in the clear. If you're doing this on a normal
internet-connected machine, the data may be compromised before you've even
protected it.

Consider using a clean air-gapped machine or booting from a read-only operating
system such as `Tails <https://tails.boum.org/>`_. You might also assemble the
sensitive data in a RAM disk to avoid committing it to any persistent storage.
Similarly, when a new kit is created, all of the pieces are stored together.
Consider where these are being written and try to separate them as soon as
possible.


Avoiding Loss
~~~~~~~~~~~~~

Salvage itself takes several steps to minimize the risk that a kit will become
unrecoverable:

* Every share in a salvage kit includes a full copy of the program that created
  it. It is not necessary to download or install any Python packages in order to
  run the main script.

* Every share also includes a README with detailed instructions for using
  salvage.py. This includes instructions for OS X and Windows users who are not
  accustomed to running Python scripts.

* The README in each share also includes detailed instructions for manually
  reconstructing the master key and decrypting the data, in case the Python
  script can not be run for any reason.

Here are a few additional recommendations for minimizing the risk of ultimate
data loss:

* Store the data well. No digital media lasts forever, but do some research on
  the current state of the art. If burning to optical media, buy high quality
  media designed for archiving. It's also a good idea to print everything out on
  acid-free paper. Ink on paper lasts a long time and OCR scanners are easy to
  come by.

* Refresh salvage kits periodically. Consider how long your storage media is
  expected to last and regenerate the kit well before that. This is also a good
  way to audit the previous kit and make sure none of the shares have gone
  missing.

* Test the recovery process. You don't necessarily need to do this with the real
  data. Create a sample recovery kit with a nonce and give it to the same people
  who hold the real thing. Make sure they can successfully reassemble the test
  kit without assistance. Add your own documentation if the standard README is
  not sufficient for your needs. (This mainly applies when your audience is not
  especially technical).


Technical Details
-----------------

This section has a quick technical description of how salvage works. The
cryptography involved is pretty trivial, so the bulk of the code is concerned
with packaging and logistics. Following is the general procedure used to create
a new salvage kit with :math:`n` participants and a threshold of :math:`t`.

#. The source data is archived, compressed, and encrypted with a random 128-bit
   key (rendered to a string for `gpg`_). We also use the key to generate a
   SHA-256-HMAC of the unencrypted archive.

#. For every unique set of :math:`t` participants (of which there are
   :math:`\binom{n}{t}`), :math:`t - 1` random keys are generated. These are
   combined with the master key by xoring the bytes to produce a final random
   key. We now have :math:`t` partial keys that xor to the master key. This can
   be visualized as a partially filled table of key material, one row for each
   :math:`t`-sized subset of :math:`n` and one column for each participant
   :math:`[0,n)`. The values in each row xor to the same master key.

#. :math:`n` directories are created, each representing one share. Each share
   gets its own identical copy of the encrypted archive, plus some metadata in a
   json file. The metadata includes:

   * A version.
   * A common UUID identifying the kit as a whole.
   * The index of that particular share.
   * The HMAC value.
   * The values of :math:`n` and :math:`t`.
   * A table of key material.

   The key material is essentially one column of the full key table: all of the
   partial keys that belong to this share, associated with a subgroup. In other
   words, it says "to combine shares 0, 1, and 2, use k1; else to combine shares
   0, 1, and 3, use k2; ...".

When :math:`t` shares are brought together, one row of the key table can be
fully reassembled, which means the master key can be recovered and the archive
decrypted.


Changes
-------

.. include:: ../../CHANGES


LICENSE
-------

.. include:: ../../LICENSE
