from browsergui import TextField
from browsergui.events import Input
from . import BrowserGUITestCase


class TextFieldTest(BrowserGUITestCase):
  def test_constructor(self):
    self.assertEqual('foo', TextField(value='foo').value)
    self.assertEqual('foo', TextField(placeholder='foo').placeholder)

  def test_set_value(self):
    e = TextField()
    e.value = 'foo'
    self.assertEqual('foo', e.value)
    self.assertEqual('foo', e.tag.getAttribute('value'))

  def test_set_value__marks_dirty(self):
    e = TextField()
    with self.assertMarksDirty(e):
      e.value = 'foo'

  def test_set_placeholder(self):
    e = TextField()
    e.placeholder = 'foo'
    self.assertEqual('foo', e.placeholder)
    self.assertEqual('foo', e.tag.getAttribute('placeholder'))

  def test_set_placeholder__marks_dirty(self):
    e = TextField()
    with self.assertMarksDirty(e):
      e.placeholder = 'foo'

  def test_change_callback(self):
    xs = []
    e = TextField(change_callback=(lambda: xs.append(1)))
    e.value = 'hi'
    self.assertEqual([1], xs)

    xs = []
    e.change_callback = (lambda: xs.append(2))
    e.value = 'bye'
    self.assertEqual([2], xs)

  def test_validation(self):
    t = TextField()

    for good_object in ('', 'abc', u'abc', 'a b c'):
      t.value = good_object

    for bad_object in (None, 0, [], ()):
      with self.assertRaises(TypeError):
        t.value = bad_object

  def test_def_change_callback(self):
    xs = []
    t = TextField()
    @t.def_change_callback
    def _():
      xs.append(1)

    t.value  = 'flub'
    self.assertEqual([1], xs)
