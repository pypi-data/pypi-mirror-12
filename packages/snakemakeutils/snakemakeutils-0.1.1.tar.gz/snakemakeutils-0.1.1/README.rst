Snakemake utils
===============

A set of utility function for use in snakemake.
Currently, for line-based transformations.

Functions:

* map_chars(cmap) - will translate characters using the given dictionary
  :code:`cmap`.
* del_char_idx(idx) - will delete the char at the given index.
* del_char(char) - will delete all characters matching :code:`char` param.
* del_line(regex) - will delete line if it matches the given regex.
* apply(trans, encoding, in_files, out_files) - will apply all transformations given in :code:`trans` list to all lines in the :code:`in_files` list producing output files from the :code:`out_files` list.

Example
-------

.. code:: python

  rule fixchars:
      input:
          "{natfile}.nat"
      output:
          "{natfile}-ch.nat"
      message:
          "Fixing/deleting chars/lines..."

      run:
          from snakemakeutils import del_char_val, del_char_idx, apply
          trans = [del_char_val('\x00'), del_char_idx(0)]
          apply(trans, "latin1", input, output)
