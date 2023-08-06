Browser GUI
===========

Tools to design GUIs viewable in a browser.

Everybody has a browser, and a lot of very smart people have designed browsers so that it's easy to make pretty, interactive pages. Wouldn't it be great if we could take advantage of this in Python? Well, now we can!

Ways to install:
- `pip install browsergui`
- `easy_install browsergui`
- download this directory, through either
  - unzipping [this](https://github.com/speezepearson/browsergui/archive/master.zip), or
  - `git clone git@github.com:speezepearson/browsergui.git`

  and then install it with either
  - `python setup.py install`, or
  - plop the `browsergui` subfolder anywhere on your Python path

Once it's installed, I recommend running `python -m browsergui.examples` to see a catalog of all the kinds of building blocks available to you, then running `python -m browsergui.examples interactive` to experiment on your own. See the [Tutorial](#tutorial) section below to understand how to think about the GUI.


Examples
--------

Here are a few short demos, to give you a taste of what this GUI framework looks like. (You can close/reopen the browser window at any time; Ctrl-C will stop the server.)

- Hello world:

        from browsergui import GUI, Text
        GUI(Text("Hello world!")).run()

- A number that increments every time you press a button:

        from browsergui import GUI, Text, Button
        button = Button('0', callback=lambda: button.set_text(int(button.text) + 1))
        GUI(button).run()

- A clock:

        import time
        import threading
        from browsergui import Text, GUI

        def main():
          now = Text("")

          def update_now_forever():
            while True:
              now.text = time.strftime("%Y-%m-%d %H:%M:%S")
              time.sleep(1)

          t = threading.Thread(target=update_now_forever)
          t.daemon = True
          t.start()

          GUI(Text("The time is: "), now).run()

        if __name__ == '__main__':
          main()


Should I use this?
------------------

### Summary

Things that are prioritized in this package: easy installation, simplicity, and the feeling that you're writing Python.

Things that are not prioritized in this package: performance and fine styling/layout control.

I think this is a great way to make simple little GUIs that don't have any fancy stuff. If you want to build a very basic UI that (a) installs without trouble and (b) has a very shallow learning curve, I recommend this. If you want your UI to be pretty or extra-responsive, I do not recommend this.

### Details

There are good things and bad things about this package.

The good:

- **Easy installation.** This package is pure Python that relies on only the standard library. This will not change while I have breath in my body.

  Consequently, it should be usable out of the box for every single person with Python 2.7 or later, without installing Tk or Qt or wxWidgets or PyObjC or any of that stuff.

- **Easy to learn.** Making simple GUIs for simple tasks is simple. Check out the `examples` directory (particularly `examples/longrunning.py` for a vaguely realistic use case).

- **Code style.** It tries very hard to be Pythonic and object-oriented. It's not just a thin wrapper over HTML/JS.


The bad:

- **Performance.** It does not even try to be high-performance. There's an HTTP request every time the user interacts with the GUI, and an HTTP request every time the view needs updating. Performance is off the table. (Each request only takes several milliseconds' round trip for me, running on `localhost`, so it's not *awful*, but it's not awesome.)

### Alternatives

I am aware of some GUI toolkits for Python that fill a similar niche. You should consider using these instead:

- [tkinter](https://docs.python.org/3/library/tkinter.html#module-tkinter) (standard library)

  Advantages: it's in the standard library. It has always worked out of the box for me. If you want maximal portability, this is probably your best bet.

  Disadvantages: it feels like a wrapper around Tk, because it is. This gives good performance and detailed control, but writing it feels unintuitive (to me).

- [pyJS](http://pyjs.org), another Python package for making GUIs targeting browsers. It works by compiling your Python code into a slug of JavaScript which runs in the browser.

  Advantages: pyJS applications are much faster and much easier to deploy (since it doesn't require the user to run Python).

  Disadvantages: I had trouble installing it. And like `tkinter`, it's a wrapper, with the same dis/advantages.


Tutorial
--------

### Basic Usage

Roughly speaking, here's a good way to think about a GUI created with this package.

> I have a `GUI` instance. The GUI has a bunch of `Element`s inside it, like text and buttons.
> Some of the elements contain other elements, in a tree structure: for example, my `Grid` element
> contains a few `EmphasizedText`s and a few `TextField`s.
>
> Modifying the elements causes them to be drawn differently in the browser. For example,
> when I execute `my_list.numbered = True`, the list markers change from bullets to numbers.
> When I execute `my_list.append(Text("new last item"))`, a new item will be added to the list.
>
> I can attach callbacks to certain elements to gather user input. For example, by executing
> `my_button.set_callback(my_function)`, I ensure that `my_function()` is called whenever
> the user clicks the button.

Just like in other GUI frameworks: the state of the user interface is represented by some data structure; modifying the data structure causes stuff to be redrawn on the screen; and functions can be attached to the data structure, to be called when the user interacts with the GUI in certain ways (e.g. clicking on buttons, typing things, etc.).

Each widget on the screen (e.g. buttons, pieces of text, tables, lists) is an `Element`. Elements are arranged in a tree structure, i.e. each Element typically has exactly one parent, which represents some widget that contains the child widget on the screen. For example:

        text_1 = Text('one')
        text_2 = Text('two')
        list = List(items=[text_1, text_2])

All three variables are Elements (`Text` and `List` are subclasses of `Element`).
`list` is the parent of the text elements, and it has no parent.
When displayed, `list` will look like

> - one
> - two

Modifying an Element should always immediately cause it to be redrawn in the browser.
For example, if `list` is being displayed in a browser, executing `list.numbered = True`
will immediately change the browser to display it as

> 1. one
> 2. two

Some Elements (e.g. buttons, input fields) allow callback functions to be attached to them,
so that the function is called whenever the user interacts with them in some way (e.g. clicking, typing).
This is accomplished by passing the function as an argument when instantiating the Element, e.g.

        b = Button(callback=lambda: print("Click!"))
        t = TextField(change_callback=lambda: print(t.value))

The last important concept is the `GUI`. The `GUI` class ties responsible for high-level stuff
that doesn't belong to any individual element, e.g. setting the page title and alerting the server
when an element changes. Pretty much all you need to know about the GUI class is:
- you instantiate it like

        GUI(element_1, ..., title='Browser page title')

- `gui.body` is an Element that you can index/modify/iterate over like a `list`

- you can call a GUI's `run()` method to start it running, like

        GUI(Text('Hello, world!')).run()


### Defining Elements

Sometimes, you might want to create a new kind of element. Suppose I hadn't defined the `List` class -- how would you make a `List` for yourself?

The answer involves a lot of HTML. Basically, every `Element` is just a wrapper around some HTML tag, which is the tag displayed in the browser. You write an `Element` subclass which defines methods that modify the HTML tag. It's that simple.

To succeed here, you'll need to be familiar with HTML (at least enough to write the HTML you want to use to display your element), and the [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) (the most useful pieces are on the [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) and [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document)).

#### Tags

Every element has an HTML tag associated with it. The tag is created by `Element.__init__`, which must be given a `tag_name` (e.g. `"ol"` for a list or `"span"` for a piece of text). The tag is an instance of `xml.dom.minidom.Element`.

Each element has complete control over its tag, and may do anything it likes to the tag or any descendant of the tag, with the following exceptions:
- do not modify the element's tag's `id` or `style` attributes, or any attributes beginning with `on` (used for event-handling)
- do not modify your children's tags, or their descendants

For example, a List instance with two children would have a tag that looks like
```html
<ol>
  <li>
    <someTag for-first-child> ... </someTag>
  </li>
  <li>
    <someTag for-second-child> ... </someTag>
  </li>
</ol>
```
The List instance is free to modify the `ol` or `li` tags in any way, including inserting or deleting tags; but it must treat the two `someTag` tags as black boxes.

After modifying an element's tag, the element's `mark_dirty()` method should be called. If the element is in a GUI being viewed in a browser, `e.mark_dirty()` will make sure the browser's version of the tag is up to date.

#### Styling

If you want to do CSS stuff, use the Element's `styles` attribute. `e.styles` is a dict-like object that, when modified, will modify the HTML tag and mark the tag as dirty.

#### Event-Handling

The event-handling framework is pretty ugly right now, and needs a major redesign. Please don't use it.


#### Example

Using what we know so far, let's implement a List element.

First, we need to figure out what the HTML should look like. Any HTML dabbler will know that it should look like
```html
<ol>
  <li>
    <tag-for-first-child />
  </li>
  <li>
    <tag-for-second-child />
  </li>
  ...
</ol>
```

Now, let's define a `SimpleList` class, which supports appending and deletion of child elements.

```python
class SimpleList(Element):
  def __init__(self, **kwargs):
    super(SimpleList, self).__init__(tag_name="ol", **kwargs)

  def append(self, new_child):
    # add a new item to our HTML list tag
    li = self.tag.ownerDocument.createElement('li')
    self.tag.appendChild(li)
    li.appendChild(new_child.tag)

    # make sure the tag gets redrawn
    self.mark_dirty()

  def delete(self, old_child):
    # remove the item containing the child from our HTML list tag
    self.tag.removeChild(old_child.tag.parentNode)

    # make sure the tag gets redrawn
    self.mark_dirty()
```
