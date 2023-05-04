const _myScript = `
We had to make a little bit more effort to reach our goal
We had to make a little bit more sacrifice to achieve success
I have a lot of work to do before I can go home
I have a lot of free time
We have a lot more to do before we can go home
It was nice of you to come all this way to see me
If you could do it at all, I'd like you to do it
It was nice of you to come all this way to see me
let me say how glad I am to be here
Every time I went to see him, I found him at work
I was about to go out when he came to see me
I make it a rule to get up at six in the morning
I will tell him the news as soon as I see him
He went out of his way to find the house for me
He's a man of his word, so you can count on him
I don't think we're ready for it in a couple different ways
I wish I had the time to stay and talk with you
If you only knew what kind of a situation I am in
We were reading a book and it was a very good one
I told her to sit down and drink a glass of water
I just want you to think about me once in a while
We know that you're one of us
Is one of you going to be there?
I think that this is one of our problems
i'm sorry, i don't know how to say her name
What is the good of doing it?
I have no idea of what it is like   
He did it for the good of the community
She was at the scene of the crime
We can't be certain of that
because every time you see them you ask about their dog
I want you to get me out of here
This is of interest to no one
`

export const myScript = _myScript
  .replace(/\n{2,}/g, '\n\n')
  .split('\n\n')
  .filter(Boolean)
  .map(line => line.split('\n').filter(Boolean))
