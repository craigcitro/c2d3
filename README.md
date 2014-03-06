# c2d3 - bits and pieces as i learn d3

this isn't anything serious -- just a bunch of little examples and notes to
myself as i learn d3. chris was interested in this, so now it's somewhere
other than just my laptop. `:D`

## links

* [thinking with joins](http://bost.ocks.org/mike/join/) explains the data
  join, which is the core concept in d3. as expected, there are a ton of
  interesting links from here, all of which are interesting.

* [how selections work](http://bost.ocks.org/mike/selection/) explains how
  selections are *implemented*; this turns out to be surprisingly useful for
  understanding how to think about them.

* andrew montalenti gave a nice [pydata talk](http://vimeo.com/79580138) about
  "rapid data viz", and there's a corresponding
  [set of slides](http://pixelmonkey.org/pub/dataviz-elements/notes/). it's a
  little more focused on easy ways to get to vaious js/viz bits from python
  (which makes sense, given the venue), but there's a lot of interesting stuff
  there.

* cynthia brewer did a bunch of work on better
  [default color combinations](http://colorbrewer2.org/), specifically focused
  around maps. of course, mike bostock has a
  [post pulling that info into d3](http://bl.ocks.org/mbostock/5577023). i
  definitely think the colorbrewer stuff is prettier, and my partly-colorblind
  officemate heartily agrees.

## podcasts/videos

there were two really nice interviews on data stories:

* [jeff heer](http://datastori.es/episode-8-interview-jeff-heer/) gave a
  really nice perspective on the history of the projects leading up to d3. in
  particular, he really highlights why not being a system-unto-itself is a big
  win.

*
  [mike bostock and shan carter](http://datastori.es/data-stories-22-nyt-graphics-and-d3-with-mike-bostock-and-shan-carter/)
  showed up and talked d3 and what they do at the NYT. super interesting.

* [mike bostock at eyeo](http://vimeo.com/69448223) is also fantastic -- but
  maybe i'm biased because i've always loved examples, too. (this makes my
  particular choice of advisor quite curious.)

## other frameworks

* [vega](https://github.com/trifacta/vega) is a higher-level description
  language built with d3 as basically
  [its primary implementation](https://github.com/trifacta/vega/wiki/Vega-and-D3).

* [nvd3](http://nvd3.org/) builds a common set of components on top of d3;
  looks nice, but i haven't used it at all.

* [dygraphs](http://dygraphs.com/) is a completely independent library -- like
  nvd3 with no d3 underneath. in particular, though, it seems to be focused on
  "really good defaults" -- it's hard to overstate what a good idea that is.

* [mpld3](https://github.com/jakevdp/mpld3) is trying to render matplotlib
  graphics on top of d3; i've got a slew of mpl graphics i'm stuck with
  elsewhere, i'm planning on use this as a shim from the 1990s into modern
  times.

  for me at least, this one's a transition tool, not an end in itself. i think
  i differ from the crowd on that part -- some people *like* mpl. (i think
  that's called stockholm syndrome?)

## random stuff/notes
