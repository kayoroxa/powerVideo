/* eslint-disable */

VGroup = {
  animate: { shift },
  scale: () => {},
}

Forma = {
  shift,
  move_to,
  next_to,
}

questions = VGroup(
  TexText('What', 'is', '$e^{t}$', '?'),
  TexText('What', 'properties', 'does', '$e^{t}$', 'have?'),
  TexText(
    'What',
    'property',
    'defines',
    '$e^{t}$',
    '?',
    (tex_to_color_map = { defines: BLUE })
  ),
  Tex()
)
questions.scale(2)

async function script() {
  await scene.add(group, dest)

  await scene.playClick(
    group.animate.shift(dest.get_center() - group[2].get_center()),

    group.animate
      .set_color(PURPLE)
      .set_opacity(0.5)
      .shift(2 * LEFT)
      .scale(3),

    GrowFromCenter(),

    Write(text),

    ReplacementTransform(frameBox1, frameBox2),
    FadeIn(text, UP * 2 + LEFT),

    FadeOut(tex[2], {
      //target_position : Dot
      shift: RIGHT,
      //scale : 0.5
    })
  )

  obj1.next_to(obj2, LEFT)
  obj1.set_width(0.7 * obj2.get_width())
  obj1.move_to(obj2) // vai pro lugar do obj2
  obj1.move_to(obj2.get_right()) // algo que fica do lado

  obj1.save_state() || obj1.restore()

  await scene.wait(0.5)
}
