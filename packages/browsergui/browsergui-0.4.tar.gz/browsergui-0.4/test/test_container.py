from browsergui import Container, Click
from . import BrowserGUITestCase

class ContainerTest(BrowserGUITestCase):
  def test_construction(self):
    left = Container()
    right = Container()
    top = Container(left, right)
    self.assertEqual(list(top.children), [left, right])

  def test_children_must_be_elements(self):
    with self.assertRaises(TypeError):
      Container(0)
    with self.assertRaises(TypeError):
      Container().append(0)
    with self.assertRaises(TypeError):
      Container(Container())[0] = 0

  def test_tag(self):
    self.assertHTMLLike('<div />', Container())
    self.assertHTMLLike('<span />', Container(tag_name='span'))

  def test_children(self):
    container = Container()
    first = Container()
    second = Container()

    self.assertEqual(list(container.children), [])

    container.append(first)
    self.assertEqual(list(container.children), [first])

    container.insert(container.index(first)+1, second)
    self.assertEqual(list(container.children), [first, second])

    container.remove(first)
    self.assertEqual(list(container.children), [second])

    container.remove(second)
    self.assertEqual(list(container.children), [])

  def test_hash_static(self):
    c = Container()
    h = hash(c)

    self.assertEqual(h, hash(c))

    c.append(Container())
    self.assertEqual(h, hash(c))

    c.callbacks[Click] = self.set_last_event
    self.assertEqual(h, hash(c))
