from browsergui import Link
from . import BrowserGUITestCase

class LinkTest(BrowserGUITestCase):
  def test_construction(self):
    link = Link('I am a link!', 'http://google.com')
    self.assertEqual('I am a link!', link.text)
    self.assertEqual('http://google.com', link.url)

  def test_set_url__marks_dirty(self):
    link = Link('foo', 'http://example.com')
    with self.assertMarksDirty(link):
      link.url = 'http://google.com'

  def test_tag(self):
    self.assertHTMLLike('<a target="_blank" href="http://google.com">Google</a>', Link('Google', 'http://google.com'))
