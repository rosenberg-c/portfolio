// Generic desktop wireframe following the homepage layout; all copy is placeholder text.
#set page(width: 30cm, height: 42cm, margin: 1cm)
#set text(size: 11pt, fill: rgb("#333333"))
#set par(leading: 0.6em)

#let ink = rgb("#777777")
#let paper = rgb("#f5f5f5")
#let space = 12pt

#let panel(body, height: auto, fill: white) = block(
  width: 100%,
  height: height,
  stroke: 1pt + ink,
  fill: fill,
  inset: 12pt,
  body,
)

#let button(label, primary: false) = box(
  stroke: 1pt + ink,
  fill: if primary { rgb("#dddddd") } else { white },
  inset: (x: 12pt, y: 7pt),
  [#label],
)

#let project-card = panel[
  #panel(height: 3.4cm, fill: paper)[#align(center + horizon)[Image placeholder]]
  #v(space)
  #text(size: 15pt, weight: "bold")[Card title]
  #v(5pt)
  Short description of this item goes here.
  #v(8pt)
  Text link   Text link
  #v(8pt)
  #text(size: 9pt, fill: ink)[Tag · Tag · Tag]
]

// Header.
#panel[
  #grid(
    columns: (1fr, auto, auto),
    gutter: 18pt,
    align: horizon,
    [*Logo / brand*],
    [Theme ▾],
    [Link 1   Link 2   Link 3   Link 4],
  )
]
#v(space)

// Hero.
#panel[
  #text(size: 26pt, weight: "bold")[Hero heading]
  #v(8pt)
  A short introductory statement describing the purpose of this page.
  #v(16pt)
  #button("Primary action", primary: true) #h(8pt) #button("Secondary action")
]
#v(space)

// Intro section: image beside text and two detail groups.
#panel[
  #grid(
    columns: (1fr, 1fr),
    gutter: space,
    panel(height: 8.3cm, fill: paper)[#align(center + horizon)[Illustration placeholder]],
    [
      #text(size: 18pt, weight: "bold")[Section heading]
      #v(8pt)
      A longer paragraph of supporting information belongs here. This area can hold a brief introduction, useful context, or an overview of what the visitor will find on the rest of the site.
      #v(12pt)
      #grid(
        columns: (1fr, 1fr),
        gutter: 10pt,
        [*Detail group* #v(5pt) Item one #v(4pt) Item two #v(4pt) Item three],
        [*Detail group* #v(5pt) Supporting detail #v(4pt) Additional detail],
      )
      #v(12pt)
      #button("Section action")
    ],
  )
]
#v(space)

// Featured items.
#panel[
  #grid(
    columns: (1fr, auto),
    align: horizon,
    [#text(size: 18pt, weight: "bold")[Section heading]],
    button("View more"),
  )
  #v(space)
  #grid(
    columns: (1fr, 1fr),
    gutter: space,
    project-card,
    project-card,
  )
]
#v(space)

// Footer.
#panel[
  #grid(
    columns: (2fr, 1fr),
    gutter: space,
    [
      *Footer heading*
      #v(5pt)
      A short closing message or invitation goes here.
      #v(5pt)
      Optional secondary information.
      #v(10pt)
      #button("Footer action")
    ],
    [Link 1 #h(8pt) Link 2 #h(8pt) Link 3 #h(8pt) Link 4],
  )
]
