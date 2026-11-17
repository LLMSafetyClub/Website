---
date: 2026-11-17T00:00
authors:
summary:
draft: false
---

**Contents**

- [Overview](#overview)
- [The Days Before](#the-days-before)
- [Friday](#friday)
- [Saturday](#saturday)
- [Sunday](#sunday)
- [Post Mortem](#post-mortem)
	- [What Worked Well](#what-worked-well)
	- [What we will do next time hopefully](#what-we-will-do-next-time-hopefully)
- [End](#end)

### Overview

On Friday, November 6th, the LSIC (LLM Safety and Interpretability Club) club at Georgia State had 5 of its members participate in the [Swarm Alignment](https://apartresearch.com/sprints/swarm-alignment-2026) research hackathon. This blog post will go over what happened throughout the weekend, what we believe everyone got out of it, and what we think worked well and what didn't throughout the weekend. Due to restrictions of the hackathon, I am not going into detail about what our project is. I think Apart Research will make public links available in a week or two, once they determine none of the projects submitted have infohazards, at which time I will add a link to the two projects we submitted into this blog post.

### The Days Before:

Throughout the past couple weeks our club has had roughly 4-5 attendees at each of our reading group meetings, so I personally DMed those people and mentioned in those meetings the upcoming hackathon, as well as posting in our club discord the week before about the hackathon.

Right before the hackathon's date, we had managed to get 5 people available for the hackathon, which is the max limit for a single team. Although not everyone could be there every day, the hackathon was an online one with an In-Person Hub at Georgia Tech, meaning that remote work and collaboration for other members who weren't available the whole time was possible.

### Friday:

The in-person AI Safety Club at Georgia Tech was hosting an in-person hub for the hackathon, which started at roughly 6:30 PM. All the team members available on Friday were there at 6:30, where GTech AISI introduced the hackathon. We got free dinner and some initial advice from GTech's organizers once we had a basic idea. We headed to GTech's main campus to work at their student center, then the library for the night.

![[Pasted image 20261115175323.jpg|Initial Meeting Room]]

*Initial Meeting Room*

![[Pasted image 20261115175316.jpg|Close up of team member with me on the right]]

*Close up of team member with me on the right*

![[IMG_9190.jpg|The initial idea we had regarding our project, that AISI organizers gave advice on]]

*The initial idea we had regarding our project, that AISI organizers gave advice on.*

I set up a google doc for us all to work on, and then started working on the initial plan we had, getting details in place, as well as other side plans we had ideas for. My initial idea was that the first portion and night should be focused on coming up with initial ideas for plans, and writing down as much detail and thinking through it as much as possible without much LLM Text copy-pasted into the doc. LLMs were used to provide feedback and figure out what gaps we had in the plan, but I wanted to keep as much human signal as possible by ensuring we typed out as much of the initial google doc plan as possible.

![[Screenshot 2026-11-15 at 3.26.06 PM.png|Snippet of tabs in google doc]]

*Snippet of tabs in google doc*

Other members had their own approaches, but for the environment I was planning I tried to do pseudo type comments and break up agents in the environment into what goal and initial info they had.

![[Screenshot 2026-11-15 at 3.27.40 PM.png|Snippet of Google Doc]]

*Snippet of Google Doc*

Once we had gotten a fairly good idea of what the main idea was, I wanted to get other people focused on coming up with their own ideas of what to implement so that during the night we could have a coding agent implement it and see viability of results in the morning across multiple plans.

![[IMG_9193.jpg|Friday 9:21 PM at Gtech Student Center]]

*Friday 9:21 PM at Gtech Student Center*

One issue with hackathons I have noticed is that in the AI Era, utilizing coding agents for implementation and results analysis is often necessary, but coordination becomes hard due to the fact everyone has different setups for coding agents, and different subscription levels.

I will likely put more detail into this set up in a future blogpost, but for now here is a basic summary of it. I set up a discord server for a hackathon a month prior at GSU with the same setup I did for this hackathon, so I just used the same server and created more channels.

I set up claude code on my desktop machine at home, running on WSL via CLI, and connected it to discord and the discord server via a discord bot token. I then told it to attempt to utilize subagents for coding implementation tasks, and to act as an orchestrator, and then gave all my team members access to the discord channel.

![[Screenshot 2026-11-15 at 3.38.37 PM.png|My first message to claude]]

*My first message to claude*

Every person's plan was able to be separated into a different channel on the discord, but our claude agent had context for all of us across the server and all our channels. Any member of the team could get claude to work on something by simply pinging it, and claude would work on whatever implementation or experiment it was asked.

![[Screenshot 2026-11-15 at 3.39.07 PM.png|Separate channels for every plan]]

*Separate channels for every plan*

Once the initial idea was fully written on the google doc, I had Claude start working on the idea in the Clue channel, then the other members had their ideas start implementing in the other channels.

**There are numerous caveats to using claude code in this manner, including MASSIVE security concerns. Do not replicate what I did unless you are as idiotic and reckless as me.**

At around 2:30 AM, the three people still at the library began to head home, with one of them ending up having car troubles and not making it home until much later, and me and the vice president heading home around 3:00 am.

### Saturday:

Saturday I woke up around 10:00 am, and GTech was gonna open at around 12:30 for people to work on the hackathon. Me and the Vice President of the club got a pretty subpar burger, and got to G-Tech at around 1:30 PM with a peppermint mocha.

We eventually got to work on the 14th floor of the Coda Building in Midtown Atlanta.

![[IMG_9201.jpg|Vice-President enjoying the view, looking outside]]

*Vice-President enjoying the view, looking outside*

For this day, basically everyone was using the discord channel to try to refine our projects, and revise the initial implementations based on the results we had gotten. Some issues I personally faced were:

- Long run times due to wanting to have 100 LLM agents run across 80 turns
- Claude Classifiers going off
	- Claude Classifier going off so badly I needed to restart the entire context
- Sudden changes in behavior of the environment based on subtle things
- Claude taking forever to implement stuff with subagents
- Results completely changing once I used a more capable model for the environment
	- GPT-OSS 120B was NOT good enough to have interesting info for me
- Basically every change I made took 30 min for code to implement and 40 min for results, meaning each change took slightly more than an hour to get feedback on.

Other members of the team probably had slightly different issues. One very nice thing about this though, is that each of us was able to work fairly independently on what individual things we wanted to analyze, but when one person wanted to use another person's progress on something else, Claude had context to it all everything running on my desktop at home, meaning we all had ability to look at each other's results and copy parts of our implementations seamlessly.

We ended up seeing a nice sunset from a small window at the top of the building with one of the AISI Organizers.

![[IMG_9205.jpg|Sunset Moment]]

*Sunset Moment*

We called it a night from GTech at around 9:00 PM and went to get dinner, though our departure was delayed by 45 minutes as we needed to get my car jumpstarted by State Farm Roadside Assistance.

![[IMG_9207 1.jpg|Waiting for car jumpstart]]

*Waiting for car jumpstart*

![[IMG_9211 1.jpg|Dinner]]

*Dinner*

One massive benefit of our implementation and experiment runner being accessible via discord is that we could utilize our phones while at dinner, while driving, or just while walking around in order to ask claude to send a figure or consider an idea or answer a question the second it entered our heads, allowing for us to work whenever we had a free thought in our brain.

At the end of the day, I think we had a pretty good idea of what experiments and results we wanted, and were able to get our implementations close to where we wanted them. After dinner we ended up at home around 11:00 PM.

### Sunday

I woke up at 8:00 AM to get my car battery replaced, and then began looking at my desktop to see if there were any problems. I then set up a plan for us (those available) to all meet at the Georgia State Library to begin working on finishing our project. We all showed up around 1 or 2 pm.

![[IMG_9220.jpg|Library Squad]]

*Library Squad*

We ended up playing silent Deadlock (new Valve game) footage on the study room tv, and began looking at how we would merge all of what we worked on together and how we would write the report. The report was due at 7 AM the next day, and we were all still doing runs at the time for our experiments.

We came up with a pretty good split, where we were going to submit two projects (since all authors in the hackathon could be on two projects), and we were able to figure out a good split of our results to make two cohesive projects on Swarm Alignment.

For the paper writing process, I knew that Claude would be utilized at the end to help polish the text and add details/methodology results, but I wanted to start it as human as possible to ensure as much human signal was in the paper as possible in terms of direction and framing.

The first thing I wrote was a draft of the abstract for both of our project reports.

![[pact399wy3qd43yhrzx8.webp|Annotated Abstract visual I used from Neel Nanda's article on writing ML Papers]]

*Annotated Abstract visual I used from Neel Nanda's article on writing ML Papers https://www.alignmentforum.org/posts/eJGptPbbFPZGLpjsp/highly-opinionated-advice-on-how-to-write-ml-papers*

At around 8:00 PM, I decided to head out of the library, and get dinner before working on it more. I set up a final schedule for everyone on the discord, where we would hard cut off results at 10:30 PM and hopefully be done by 4:00 AM.

![[Screenshot 2026-11-15 at 4.11.45 PM.png|Iraj Final Schedule Message]]

*Iraj Final Schedule Message*

At around 10:30, I began attempting to get nice visuals for everyone's results, as well as making nice methodology slides as well. I used a [github repo](https://github.com/safety-research/viz) for data visualization and one for [methodology slides](https://github.com/ChenLiu-1996/figures4papers), and began also putting as much about the results analysis as I could, as well as methodology and figuring out what key figures to utilize.

Everyone else was doing the same thing as well and finishing up writing about what they had done, and the results gotten, and how it all connected. Eventually, we managed to get all our analysis and results in the google doc, and our methodologies summaries, and what figures we wanted. We then utilized the claude code in the discord to fact check everything, and add appendices and detail to the report that we had missed, while keeping as much of our framing and wording as possible. This eventually got moved to Overleaf, and we submitted the projects at around 5:40 am. I went to sleep after we submitted, but another member continued editing the project report and wording then resubmitting right at the due date.

### Post Mortem:

Once everyone had slept and got back into normal life after the weekend, I asked everyone about how they felt about the hackathon. Everyone seemed to be very happy about how the hackathon went, and everyone also seemed to have gained much more interest in AI Safety as a whole and the topics they had done their respective work on. I think that going into this project, I wanted everyone to have a good time and have fun, and I think that succeeded. I think giving everyone access to a coding agent, and encouraging everyone to work semi-individually in a shared discord server allowed us to constantly look at what other people were doing and comment or share ideas, while still allowing each member agency and the ability to work on a research project.

Ultimately, I had a really good time at this research hackathon, and I think it succeeded in getting our members really excited about AI Safety research, and individual topics within it. The use of shared claude code was a success, along with encouraging independence among our team members until the end.

#### What Worked Well

- Shared Discord Server that was used to implement and run experiments with one coding agent on one desktop
- Having people work on individual ideas/plans and allowing each team member relative freedom on how they approached their project
- Getting people involved in the hackathon despite having no experience with research
	- Everyone to my understanding had a very good time and felt much more capable at the end
- Utilizing G-Tech's in person hub to have added structure and resources (G-Tech's AI Safety group gave us $100 worth of OpenRouter credits)

#### What we will do next time hopefully

- Do more reading on the hackathon project beforehand
	- Apart had plenty of readings we could have done, which I merely skimmed along with other members I believe
- Look at the online events Apart had for the hackathon
	- I only watched 2 of them, when there were many other highly relevant events that were recorded as well
- Attempt to have stronger deadlines on plan progress for all involved (Including myself)
	- At times when running iterative experiments it feels like we just need 2 more runs until we have a good implementation. Without hard deadlines or hard stops it is difficult for us to figure out where we are wasting time in our work and where we are not. This is extremely difficult for normal research with weekly progress meetings, and much more difficult for something like a 2-3 day hackathon. I still think it is important. Perhaps having every 5 hours a quick 5 or 10 minute update with all the members where we had to explain what our progress is and some visuals would be nice.
- Getting more people involved
	- We had 5 people including myself participate, which was incredibly exciting, however more is always better.
- Make Claude Code Discord Idea better
	- **INCREDIBLY UNSAFE AND RECKLESS**. I will probably post a blog on exactly how I implemented it, but I essentially gave 4 people complete access to my desktop along with claude code for a couple days. This is incredibly stupid and dumb, not only because of possible malicious actions, but unmalicious actions like prompt-injection from external sites that could have occurred.

### End:

I had claude code make a final music video about the experience at the very end. Please watch (:.
(https://youtu.be/VB55M8LHSes)

One of our projects ended up being one of the top 2 winners for the G-Tech in person hub, and we are waiting for the results from Apart to see how we fared overall.

If you are a GSU Student and want to join the club, please join the discord server in the [[join|join tab]]. If you're a GSU Professor who wants to advertise this to your students, please email me at imoradi 'at' gsu 'dot' edu. If you are a random person, I hope you enjoyed the blog and decide to do Apart Research Hackathons on your own.

Shoutout to [Apart](https://apartresearch.com/) for making the hackathon, [GTech AI Safety club](https://www.aisi.dev/) and their organizers for being extremely helpful to me and for hosting the in-person hub and giving credits for experiments, and to [Adaption](https://adaptionlabs.ai/) for giving all participants a lot of credits for the hackathon.
