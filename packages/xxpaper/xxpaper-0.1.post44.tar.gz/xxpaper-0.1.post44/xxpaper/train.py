#! /usr/bin/env python

from xxpaper.sheet import Sheet

class Train (Sheet):
  def __init__ (self, cfgs, sheet, page, fname):
    Sheet.__init__ (self, cfgs, sheet, page, fname)
    # Offsets within tile
    self.rust_stripe_inset_y = int (self.value ("rust_stripe_inset_y"))
    self.rust_stripe_height = int (self.value ("rust_stripe_height"))

  def page_details (self):
    self.rust_stripe ()
    self.trade_stripe ()

  def tile_details (self, x, y):
    self.train_type (x, y)
    self.rust (x, y)
    self.trade_to (x, y)
    self.train_cost (x, y)

  def train_cost (self, x, y):
    bx = self.tile_x / 2
    by = self.rust_stripe_inset_y + (self.rust_stripe_height * 4)
    self.fd.append ("%f %f moveto" % (bx, by))
    self.text ("cost", x, y, h_centre = 0, v_centre = 1)

  def trade_to (self, x, y):
    bx = self.tile_x / 2
    by = (self.rust_stripe_inset_y * 2) + self.rust_stripe_height + 3
    self.fd.append ("%f %f moveto" % (bx, by))
    self.text ("trade", x, y, h_centre = 0, v_centre = 1)

  def trade_stripe (self):
    oy = self.y_off + (self.rust_stripe_inset_y * 2) + self.rust_stripe_height
    for y in xrange (self.num_y):
      by = (y * self.tile_y) + oy
      self.box ("trade_stripe", 0, y, 0, by,
                self.rubber_x, self.rust_stripe_height)

  def rust (self, x, y):
    bx = self.tile_x / 2
    by = self.rust_stripe_inset_y + 2
    self.fd.append ("%f %f moveto" % (bx, by))
    self.text ("rust", x, y, h_centre = 0, v_centre = 1)

  def rust_stripe (self):
    oy = self.y_off + self.rust_stripe_inset_y
    for y in xrange (self.num_y):
      by = (y * self.tile_y) + oy
      self.box ("rust_stripe", 0, y, 0, by,
                self.rubber_x, self.rust_stripe_height)

  def train_type (self, x, y):
    inset_y = int (self.value ("train_type_inset_y"))
    bx = self.tile_x / 2
    by = self.tile_y - inset_y
    self.fd.append ("%f %f moveto" % (bx, by))
    self.text ("train", x, y, h_centre = 0, v_centre = 1)
