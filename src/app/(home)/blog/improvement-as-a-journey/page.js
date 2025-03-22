import ArticleFormat, { ArticleLink, Header, LIParagraph, Paragraph, SubHeader, ArticleImage, SubSection, Quote, Italic } from "../articleFormat";

import journey from './journey.png';
import road from './road.png';
import road2 from './road2.png';
import road3 from './road3.png';
import road4 from './road4.png';
import road5 from './road5.png';
import road6 from './road6.png';
import road7 from './road7.png';
import scale from './scale.png';
import roadQuestions from './road-questions.png';

export const info = {
    title: 'Improvement as a Journey',
    author: 'Amanda Meyer',
    length: '15',
    description: 'Going the Distance with Improvement Science.',
    href:'/blog/improvement-as-a-journey',
    thumbnail:'/thumbnails/improvement-as-a-journey.jpg',
    aspectRatio: 1200/628, //1200/628
};

export default function Page() {

    const site = 'https://hthunboxed.org/improvement-as-a-journey-going-the-distance-with-improvement-science/'

    return (
        <ArticleFormat
            {...info}
            >
            {/* Intro */}
            <Paragraph inline>
                Every trip begins with a desire to get from where we are now to where we want to be. The same is true in problem-solving: when we experience a gap between our current reality and our aspirations, we’ve got a problem to solve – and a journey to go on!
            </Paragraph>
            <ArticleImage src={journey} alt='journey' />
            <Paragraph>
                In America, most educational gaps we face are rooted in the fact that our schools were not designed for equity. Thomas Jefferson, frequently credited with first envisioning American public education, wrote openly about it as a system for dividing the citizenry into two classes: “the laboring and the learned” (1814). Over the centuries that followed, our schools both reflected and perpetuated larger societal inequities, denying quality education to immigrants, indigenous people, descendants of enslaved people, women, and the poor, while concentrating power and opportunity in the hands of the wealthy, white, and male (Ladson-Billings, 2006). Even in recent years, despite our society’s stated commitment to equal educational opportunity, patterns of unequal outcomes have been maintained by widely documented factors such as vastly unequal school funding, biased application of disciplinary procedures, academic tracking, and an educator workforce that does not reflect the diversity of America’s students (Lewis & Diamond, 2015). Because our system was not designed to educate all children well irrespective of race, class, gender, ability, or native language, our efforts to do so today inevitably grapple with the ramifications of historical and ongoing oppression (Anaissie et al., 2021).
            </Paragraph>
            <Paragraph>
                Improvement science (a form of continuous improvement) is a methodology used in many fields to identify, understand, and solve problems, with an emphasis on producing consistently high-quality results, every day, for every person. When practiced with attention to the historical and present-day sources of inequity embedded in our schools, it can be a powerful method for closing gaps in educational experiences and outcomes. Organizations that practice improvement science become “learning organizations” that continually get better at what they do. Schools must become phenomenal learning organizations because they are crossing uncharted territory as they work to dismantle the past and build an educational system that reliably educates all children.
            </Paragraph>
            <Paragraph>
                At its simplest, an “improvement” can be defined as a problem solved, or a gap closed (Ahlström, 2015). Anytime we close the distance between where we are and where we want to be, we are creating improvement. In many ways, solving problems using improvement science is like going on an adventurous road trip with your colleagues!
            </Paragraph>
            <ArticleImage src={road} alt='road' />

            {/* Changing How We Travel: Better Problem-Solving */}
            <Header>
                Changing How We Travel: Better Problem-Solving
            </Header>
            <Paragraph>
                Make no mistake, educators are phenomenal gap-closers. Whether they are creating lessons or building classroom culture or making the most of ever-dwindling resources, educators are solving problems all day long. However, building an equitable school that reliably serves all students, every day, in every classroom and grade level, requires us to take our problem-solving to the next level. We need skilled improvers working together in strategic ways, along with the culture, relationships, and structures that allow for continuous, collective learning. Better problem-solving means thinking differently about how we travel from our current location to where we want to be. There are three common problem-solving “potholes” that improvement science can help us avoid.
            </Paragraph>
            <SubHeader>
                Pothole #1: Solutionitis
            </SubHeader>
            <Paragraph>
                The urgency we feel in our work with young people can lead us to commit to a particular “route” without knowing how well it will actually address the problem we face. This common tendency is called, “solutionitis” (Bryk et al., 2015). Without taking the time to examine our starting point from a variety of perspectives, we not only limit our options but also risk selecting solutions that, however well-intentioned, are based on our own assumptions or biases. Improvement science practices put “speed bumps” on the road to help us slow down our thinking and consider what we might not be seeing. This slowing down also helps us avoid jumping from solution to solution, and thereby burning unnecessary “fuel” by spending our team’s time, resources, and goodwill on routes that are unlikely to work.
            </Paragraph>
            <SubHeader>
                Pothole #2: Analysis Paralysis
            </SubHeader>
            <Paragraph>
                In contrast to travelers swept up by solutionitis, some travelers want to be extremely certain they are taking the right route towards their desired destination. In trying to anticipate and account for every possible detail and eventuality, they fail to progress at all. We can call this pursuit of certainty through copious planning a form of “analysis paralysis.” Most journeys require some trial and error, and at least a few dead ends. If we don’t put our plans into action, we will never learn what actually works out on the open road.
            </Paragraph>
            <SubHeader>
                Pothole #3: Focusing on Individuals, not Systems
            </SubHeader>
            <Paragraph>
                A final common problem-solving pothole is the tendency to place disproportionate blame on individuals doing the work. Too often, we blame people within the system, assuming if only they cared enough, knew more, or tried harder, our problem would not exist. But the reality is that people, processes, and tools come together in systems to perform complex work that is more than the sum of its parts. According to an often-cited improvement adage, “every system is perfectly designed to get the result it gets” (Langley et al., 2009).
            </Paragraph>
            <Paragraph>
                W. Edwards Deming, a founder of the field of continuous improvement, said that if he were to use percentages to describe the relative impact of people versus systems, he believes individuals are responsible for just about 6% of the outcome, while the design of the system they work in determines the remaining 94% (Deming, 2000). Better results do not come from replacing people in the system; they come from redesigning our system to work better (Bryk et al., 2015). Seeing the people closest to the problem as the problem is a form of deficit thinking we must interrupt whenever it arises (Hinnant-Crawford, 2020).
            </Paragraph>
            <Paragraph>
                Through improvement science, we can cure solutionitis, break free of analysis paralysis, and redesign the systems that produce our results. We can grow the capacity of our teams to engage in disciplined but action-oriented problem-solving, in which stakeholders learn and grow (and travel great distances) together.
            </Paragraph>

            {/* Preparing to Leave: Who are “we”? */}
            <Header>
                Preparing to Leave: Who are “we”?
            </Header>
            <Paragraph inline>
                Just like on a road trip, who you’re traveling with on your improvement journey makes a big difference! While improvement science can be practiced independently, we travel the farthest in collaboration with others working towards the same goal. Improvers must ask themselves:
            </Paragraph>
            <ul>
                <LIParagraph>
                    Who considers this a problem, and why?
                </LIParagraph>
                <LIParagraph>
                    Who is most impacted by this problem?
                </LIParagraph>
                <LIParagraph>
                    Who is best positioned to address this problem through their daily work?
                </LIParagraph>
                <LIParagraph>
                    Whose perspective has been historically excluded or undervalued, but is vital to solving this problem
                </LIParagraph>
            </ul>
            <Paragraph>
                Based on our answers to these questions, we can identify who we must be in relationship with throughout this journey. A key value in improvement science is that those closest to the work are best positioned to improve it. When our team of travelers consists of a diverse group of stakeholders with different backgrounds, vantage points on the problem, and forms of expertise to offer, we are far more likely to have the collective wisdom needed to reach our destination.
            </Paragraph>
            <Paragraph>
                Another aspect of answering the question, “Who are we?” requires each of us to look inwards, at our own identities, experiences, and lenses for viewing the world. We might ask ourselves, for example, how our own race, gender, culture of origin, or personal history might create a lack of awareness or contribute to harmful power dynamics in our work. Alternatively, how might our own unique constellation of identities and experiences present assets and opportunities along this journey? An ongoing practice of self-awareness and critical reflection is essential to applying the considerable power of improvement science towards interrupting inequity, rather than reproducing it (Anaissie et al., 2021).
            </Paragraph>
            
            {/* The Improvement Journey: Questions and Answers */}
            <Header>
                The Improvement Journey: Questions and Answers
            </Header>
            <Paragraph>
                All improvement is about learning. After all, if we knew exactly how to get to our destination, wouldn’t we be there already? Improvers must have the humility to recognize how much we do not know yet and the curiosity to ask lots of questions along the way (Lucas & Hadjer, 2015). The following diagram illustrates the learning questions that are asked at different phases of the journey. Each question is explored in greater detail below.
            </Paragraph>
            <ArticleImage src={roadQuestions} alt='road-questions' />
            <SubSection>
                <SubHeader>
                    CASE STORY | Introducing Fruit View Elementary
                </SubHeader>
                <Paragraph inline>
                    To illustrate the various phases of the improvement journey, we will follow the story of “Fruit View Elementary,” where a recent assessment of needs and assets in the school community has surfaced family engagement as an area in need of improvement. A team consisting of a community school coordinator, an assistant principal, two teachers, and a parent liaison has prepared to depart on their improvement journey. While “Fruit View” is a fictional team, the journey featured in the case is based on a real improvement effort.
                </Paragraph>
            </SubSection>
            
            {/* Getting Started: Where Are We Now? */}
            <Header>
                Getting Started: Where Are We Now?
            </Header>
            <ArticleImage src={road2} alt='road2' />
            <Paragraph>
                Unlike a road trip, where we are likely to know exactly where we are starting from, an improvement journey requires careful attention to the starting location, or “current state.” The goal is to assemble a shared “picture” of our current performance based on a mix of data, both quantitative and qualitative. The clearer our common understanding of the current state, the stronger the foundation for our improvement journey.
            </Paragraph>
            <Paragraph inline>
                When collecting information about the current state, we may use tools like the fishbone diagram to analyze root causes of problems, empathy interviews to understand stakeholder experiences, and process maps to visualize how things are currently done (Bryk et al., 2009; Hasso Plattner Institute of Design, 2018; Langley et al., 2009). We also gather and explore data relevant to current practice and performance. At the heart of exploring the current state is examination of variability in practice and in results (Hinnant-Crawford, 2020). Some questions we might ask include:
            </Paragraph>
            <ul>
                <LIParagraph>
                    What is our current practice? What is consistent and what is not? Why?
                </LIParagraph>
                <LIParagraph>
                    Who benefits the most from our current practice? Who benefits least?
                </LIParagraph>
            </ul>
            <Paragraph>
                When we bring all this information together and combine it with our team’s collective wisdom and experience, we will build a far more complete understanding of the current state than any one of us could have had alone.
            </Paragraph>
            <SubSection>
                <SubHeader>
                    CASE STORY | The Current State at Fruit View Elementary
                </SubHeader>
                <Paragraph>
                    At Fruit View, the team discussed many aspects of parent engagement. However, a major pain point was clearly low family attendance at school events. Staff felt significant time, resources, and care were invested in these functions, but only a tiny portion of the target audience was benefiting. The team recognized that it was time to focus on understanding the system producing these results. They got deeply curious about the current state of school events and set out to investigate.
                </Paragraph>
                <Paragraph>
                    First, they gathered sign-in and attendance data from various school events over the past year. They recognized the data wasn’t perfect, but they knew that having some concrete numbers would ground their discussion better than relying on memory alone. They also conducted empathy interviews with three staff members to understand their experiences hosting events. After being interviewed, the Assistant Principal felt inspired to examine her own workflow, so she drew a quick process map that laid out the steps she takes in planning, scheduling, and marketing parent-teacher conferences. The team also conducted empathy interviews with five parents, including two who regularly attend school functions and three who do not, but had come to the school for other purposes and were willing to also share their perspective on school events.
                </Paragraph>
                <Paragraph inline>
                    After a couple of weeks, the team came together to consolidate what they had learned about the current state. Insights that emerged included:
                </Paragraph>
                <ul>
                    <LIParagraph>
                        70 families attended the first conference night of the year, as compared to almost 300 families attending the Fall Festival.
                    </LIParagraph>
                    <LIParagraph>
                        Attendance at school events was highest for students proficient in English, and lower for families of English Learners. Language barriers remained a consistent issue during in-person events, from both the staff and parent perspective.
                    </LIParagraph>
                    <LIParagraph>
                        Staff and parents alike felt that parent-teacher conferences are one of the highest-leverage events for involving parents in their child’s education but tend to be less appealing than “fun” community-building events like the Fall Festival.
                    </LIParagraph>
                    <LIParagraph>
                        In the planning process for parent-teacher conferences, there often wasn’t enough lead time for staff to get reminders out to parents about the opportunity before scheduling conflicts arose.
                    </LIParagraph>
                </ul>
            </SubSection>

            {/* Charting the Course: Where Do We Want to Go? */}
            <Header>
                Charting the Course: Where Do We Want to Go?
            </Header>
            <ArticleImage src={road3} alt='road3' />
            <Paragraph>
                Once we understand where we are now, we can better identify where we want to go. Maybe it’s the ultimate destination we had in mind when we identified the need to travel, or maybe we will first select a mid-point on the way to that more distant locale. Either way, we must clearly name what we want to achieve, and the purpose of our trip will be to figure out how to close the distance between where we are now and this destination. The destination of any improvement journey is articulated in an aim statement. An aim includes what will be improved, how much, by when, and for whom (Bennet & Provost, 2015). As improvement leader Donald Berwick says, “‘some’ is not a number and ‘soon’ is not a time” (2004). When setting an aim, specificity is key.
            </Paragraph>
            <SubSection>
                <SubHeader>
                    CASE STORY | Fruit View’s Aim Statement
                </SubHeader>
                <Paragraph>
                    The Fruit View team could see that the current state was a long way from their vision: not only was attendance at school events lower than they wanted, but it was also worse for some types of families than others. It was time to select an aim statement to focus their improvement efforts. While they had larger aspirations around changing the family experience of many types of events at their school, they knew they had to start somewhere to set the foundation for later efforts. Given what they had learned during their investigation of the current state, they decided to set an aim around improving attendance at parent-teacher conferences, with a specific focus on families of English Learners. Because the school offered conference nights three times over the course of the year, they knew they had two more opportunities this school year to learn if they were improving. Their aim statement was:
                </Paragraph>
                <Quote>
                    <Paragraph inline>
                        By our spring parent-teacher conference night, we will increase family attendance from 70 families to at least 150 families out of 457, with at least ½ of English Learner families participating.
                    </Paragraph>
                </Quote>
                <Paragraph inline>
                    By explicitly naming English Learner families in their aim statement, the team ensured their problem-solving focus would be grounded in the needs of a student population currently least well-served by the status quo.
                </Paragraph>
            </SubSection>

            {/* Charting Our Course: How Will We Know If We Are Getting There? */}
            <Header>
                Charting Our Course: How Will We Know If We Are Getting There?
            </Header>
            <ArticleImage src={road4} alt='road4' />
            <Paragraph>
                As we navigate towards our aim, we will need a way to know if we are going in the right direction. While travelers on a road trip might rely on Google Maps, improvers on an improvement journey know our desired destination but not how best to get there. Strategically chosen measures can provide us with ongoing and timely feedback about our progress, much like periodically checking our GPS coordinates as we drive. On an improvement journey, we use data not only to evaluate whether we have reached our aim, but also to help us reflect and adjust along the way. Like an expert teacher using formative assessment in the classroom, we gather simple data from within our daily work that gives us just enough information about which direction we should head towards next.
            </Paragraph>
            <SubSection>
                <SubHeader>
                    CASE STORY | Learning from Measures
                </SubHeader>
                <Paragraph inline>
                    Based on their aim, the Fruit View team knew there were two key measures that would reveal if their changes were leading them to their desired destination:
                </Paragraph>
                <ul>
                    <LIParagraph>
                        Overall number of conferences held
                    </LIParagraph>
                    <LIParagraph>
                        Proportion of English Learner families who had a conference
                    </LIParagraph>
                </ul>
                <Paragraph inline>
                    They would collect and report these two measures each time they had a parent-teacher conference night. While these were the measures related to the outcomes they wanted to achieve, the team also prepared to collect data on the processes they were trying to change (Langley et al., 2009). They committed to checking in with parents and asking for feedback during and after each conference night, as an additional source of data. Some questions they planned to ask parents included:
                </Paragraph>
                <ul>
                    <LIParagraph>
                        How and when did you hear about conference night? Did you have enough advance notice?
                    </LIParagraph>
                    <LIParagraph>
                        Why did you decide to attend? Were your expectations met?
                    </LIParagraph>
                    <LIParagraph>
                        What can our school do to help you feel welcome here?
                    </LIParagraph>
                </ul>
                <Paragraph inline>
                    They also asked teachers to track when and how they invited families, so there would be data to examine around that practice as well.
                </Paragraph>
            </SubSection>

            {/* Charting Our Course: How Might We Get There? */}
            <Header>
                Charting Our Course: How Might We Get There?
            </Header>
            <ArticleImage src={road5} alt='road5' />
            <Paragraph>
                In some of our previous experiences with problem-solving, it’s likely that picking a route is what came first. But without initially clarifying our current location, our destination, and how we will get feedback on our progress, it’s no guarantee the route we pick will lead us to where we want to go.
            </Paragraph>
            <Paragraph>
                Even when we have those parts in place, we still might not know the most effective route to our destination. That’s why we name many potential routes, and we start our journey with the expectation that we will make a few wrong turns here and there. In improvement, our routes are known as change ideas, or possible alterations we could make to our practice. Our guess of which combination of change ideas might lead to our aim is called our theory of improvement (Langley et al., 2009). The word “theory” is critical here: a theory, as used in improvement science, is a set of beliefs that may or may not be right. We articulate our route as a theory with the expectation that our theories will be put to the test and eventually evolve based on how our journey unfolds.
            </Paragraph>
            <Paragraph>
                Typically, teams think of their route not as a theory but as a plan. When we commit to a plan unwaveringly, no matter how “strategic” it might have been at the outset, we are not leaving ourselves open to new learning. We do not benefit from opportunities to reassess, adjust, or abandon our route entirely based on how the journey is going. When our plan does not lead us to the destination we hoped, our group of travelers loses valuable time, resources, and motivation. Strategic planning and problem-solving are not the same thing.
            </Paragraph>
            <SubSection>
                <SubHeader>
                    CASE STORY | Generating Ideas for Change
                </SubHeader>
                <Paragraph inline>
                    The Fruit View team had spent a couple weeks examining the current state and setting targets for what they wanted to achieve. Finally, it was time to make changes! The team began by examining their findings about the current state and reflecting again on their team composition. While the team represented a range of racial, cultural, and linguistic backgrounds, they recognized that no one on their team could know exactly what it was like to be a Fruit View parent of an English Learner. So, they engaged in design sessions with parents to collaboratively develop change ideas for improving conference nights. Together, they were able to assemble this starting theory based on several high-leverage areas:
                </Paragraph>
                <ul>
                    <LIParagraph>
                        Incentives that Appeal to Families
                    </LIParagraph>
                    <ul>
                        <LIParagraph>
                            Offer additional features at conference night: dinner, uniform & clothing sign-up, and free health screenings
                        </LIParagraph>
                        <LIParagraph>
                            Attach a culturally relevant musical event to the conference night
                        </LIParagraph>
                    </ul>
                    <LIParagraph>
                        Timely, Clear, and Culturally Relevant Communication
                    </LIParagraph>
                    <ul>
                        <LIParagraph>
                            Create a protocol that gives teachers guidance about how and when to invite all parents to conferences
                        </LIParagraph>
                        <LIParagraph>
                            Engage a Spanish- and Mam-speaking parent engagement coordinator to make personalized phone calls to identified families about conference night
                        </LIParagraph>
                    </ul>
                    <LIParagraph>
                        Student Ownership and Investment
                    </LIParagraph>
                    <ul>
                        <LIParagraph>
                            Change the format to student-led conferences, at least for the older grades, so that students play a larger role in bringing their families to conference night
                        </LIParagraph>
                    </ul>
                </ul>
                <Paragraph inline>
                    Instead of getting excited about any one idea, the team knew that their initial ideas were just a humble theory. To learn which changes were effective, the team would have to experiment!
                </Paragraph>
            </SubSection>

            {/* Exploring Routes: What’s Working and What’s Not? */}
            <Header>
                Exploring Routes: What’s Working and What’s Not?
            </Header>
            <ArticleImage src={road6} alt='road6' />
            <Paragraph>
                As we travel along our improvement journey, sometimes our route will take us down smooth, straight, four-lane highways that cover a lot of distance in a short time. In other moments, we find ourselves on roads that are winding, unpaved, or even dead ends. Despite the twists and turns, what is important is that we have a bias towards action and try many possible roads, while constantly asking ourselves, “What’s working? What’s not? And why?” The goal is to learn quickly, evolve from failure, and accumulate knowledge about the best routes to our destination. If it were easy to get there, we’d be there already. Instead, we must learn together through trying many different approaches.
            </Paragraph>
            <Paragraph>
                In improvement work, the structure we use to experiment with our routes is a tool called the Plan-Do-Study-Act Cycle (described in detail by Langley et al., 2009). Through rapid, iterative cycles, we can learn quickly how our ideas play out in practice, and then scale them up to reach more stakeholders in more settings (Langley et al.).
            </Paragraph>
            <ArticleImage src={scale} alt='scale' inline />
            <Paragraph sx={{fontStyle:'italic', fontSize:'1rem', lineHeight:'1.25rem'}}>
                Adapted from The Improvement Guide (Langley et al.)
            </Paragraph>
            <Paragraph>
                In the Fruit View case, they were working on a conference night structure that occurred infrequently (only three times during the year). Even when working on something infrequent, we can still find many opportunities to test and iterate our ideas. For Fruit View, any interaction with a parent could become a chance to experiment. When we learn how to make things better for one person, we can scale those lessons up to benefit more people (Bryk et al., 2009).  Recognizing the small opportunities to learn in our everyday work is central to improvement.
            </Paragraph>
            <SubSection>
                <SubHeader>
                    CASE STORY | Plan-Do-Study-Act Cycles at Fruit View
                </SubHeader>
                <Paragraph>
                    The second conference night of the year was fast approaching. The team’s theory was that providing additional services would incentivize more families to attend, so they decided to experiment with offering dinner, uniform and clothing sign-up, and free health screenings. Information about these new offerings was included in the materials and robocalls sent to parents. They predicted that at least 120 families would attend, and that all three services would be popular among families.
                </Paragraph>
                <Paragraph>
                    They held the second conference night, and sure enough, there was a boost in attendance! However, the night also produced some important insights:
                </Paragraph>
                <ul>
                    <LIParagraph>
                        Attendance increased to 104 families from 70 families at the first conference night, but the boost was not as significant as predicted.
                    </LIParagraph>
                    <LIParagraph>
                        Almost every attendee participated in the meal. The uniform and clothing offering was also very popular, and a small crowd surrounded the sign-up table for most of the evening. Just five parents stopped by the health screening table all evening. Because the team knew the power of combining quantitative data with qualitative data, they checked in with a few parents during the event and learned that it wasn’t the right setting: it was not appealing to do the screening in view of all the other attendees.
                    </LIParagraph>
                    <LIParagraph>
                        The additional features did not appear to significantly affect the rates of participation for English Learner families, which were still lower than participation amongst non-English Learner families.
                    </LIParagraph>
                </ul>
                <Paragraph>
                    Based on these findings, the team’s theory evolved: perhaps communication was the more important driver for these families, rather than the appeal of the event. This hunch was reinforced by the data teachers had collected around the invitation process: for many English Learner families, there was no confirmed two-way communication around the upcoming conference night. Teachers had sent information but had not heard if the information had been received. They hypothesized that if English Learner families engaged in timely, two-way communication in a language they understand, they would be more likely to attend. For the third conference night, the dinner and uniform sign-up would be repeated, but they would layer on an additional change idea: providing teachers with a protocol several weeks in advance that presented guidance for how to personally invite all parents to conferences. The protocol included recommendations for how often to extend the invitations, as well as how to leverage different communication mediums and multiple languages. It also contained a step for nominating families to be called by a parent liaison that spoke both Spanish and Mam, the most common languages spoken by their English Learner families. They designed the protocol in collaboration with several teacher leaders from different grade levels, to ensure it was relevant and helpful to teachers. The team predicted family participation would increase to at least 160 families, with at least 40% of English Learner families participating.
                </Paragraph>
                <Paragraph inline>
                    The final conference night of the year arrived. The change ideas unfolded as planned, with teachers using the protocol to extend personal invitations and request a reply. Attendance at the conference night rose sharply, with 168 families in attendance, including 31 of 76 English Learner families! The team also collected feedback from parents and teachers, resulting in some suggestions for improving the outreach protocol, which the team recorded for testing the next time the school held a conference night.
                </Paragraph>
            </SubSection>
            
            {/* Taking Stock: What Have We Learned? */}
            <Header>
                Taking Stock: What Have We Learned?
            </Header>
            <ArticleImage src={road7} alt='road7' />
            <Paragraph>
                When our journey ends, either when we have reached our destination or need to pick a new one, it is important we reflect on what we learned from our trip. We are likely not the last people who will want to go to this destination. What worked for us? What routes might others try? What dead ends would we suggest they avoid?
            </Paragraph>
            <Paragraph>
                In improvement work, we call this reflection learning consolidation. Often, what we have learned can be documented in some way. If we have developed practices that we think others in our organization should use, it helps to write down the steps we took, the materials we used, and any advice we have for others. When we capture our most promising practices, we increase the likelihood that more efficient, effective, and equitable ways of getting somewhere become the “map” that everyone in our organization uses. Travelers from other organizations might want to use our map as well!
            </Paragraph>
            <Paragraph>
                When we reach the conclusion of any improvement journey, we celebrate our progress and share our findings with our community. However, because we have become such capable travelers, the question soon becomes, “Where are we now, and where do we want to go next?” A new journey begins.
            </Paragraph>
            <SubSection>
                <SubHeader>
                    CASE STORY | Celebrating Learning and Looking Ahead
                </SubHeader>
                <Paragraph>
                    The Fruit View team had much to celebrate. They had traveled a long distance in a short time, more than doubling attendance at conference nights, and increasing participation among English Learner families. While they didn’t entirely meet their aim of 50% of English Learner families participating, they got a lot closer and learned many lessons to bring into the following year. They also felt proud of their team’s collaborative problem-solving: they had worked together to explore a problem, set an aim, involve stakeholders in the creation of new ideas, experiment with different approaches, and capture what was learned. It was a more systematic, focused, and inclusive approach than most team members had ever experienced.
                </Paragraph>
                <Paragraph>
                    At an all-staff meeting, they shared their most promising discoveries about how to engage families, and their colleagues formed small groups to discuss how those insights might apply to other school events. Finally, they updated their planning documents for conference night, so that this year’s best practices would be next year’s starting point.
                </Paragraph>
                <Paragraph>
                    Near the end of the meeting, a colleague raised her hand: “What about Parent-Teacher Association meetings?” she asked. “Maybe we should figure out what’s preventing parents from engaging in those events?”
                </Paragraph>
                <Paragraph inline>
                    The team looked at each other and smiled. A new challenge had emerged on their journey towards better family engagement, and they knew just how they would approach it.
                </Paragraph>
            </SubSection>

            {/* Concluding Thoughts */}
            <Header>
                Concluding Thoughts
            </Header>
            <Paragraph>
                The Fruit View story demonstrates how a problem-solving effort might progress from the identification of a gap to the adoption of new practices that successfully improve results. However, it is just one example. While the principles of improvement science remain constant, no two journeys are the same.
            </Paragraph>
            <Paragraph>
                Although applying improvement science to focused projects can be a powerful way to achieve specific aims, we must also consider how we are building school-wide culture and skills around improvement. People have the capacity to solve their own problems. Improvement science provides the shared language, common tools, and collaborative protocols needed to unleash people’s innate problem-solving capacity. Imagine if the Fruit View team working on parent engagement was situated within an entire school of expert problem-solvers focused on identifying and addressing sources of inequity in their students’ educational experiences. What then might be possible?
            </Paragraph>
            <Paragraph>
                When we are new to the practice of improvement science, it is natural to feel a little intimidated by the jargon and the tools. This way of traveling might feel very different from what we are used to. However, the most important thing is that we get started, even if we don’t feel totally ready. Find a group of like-minded travelers, grab your keys, and hit the road! The learning is in the journey.
            </Paragraph>

            {/* Glossary */}
            <Header>
                Glossary
            </Header>
            <Paragraph>
                <b>Aim Statement:</b> A succinct statement of what the improvement effort is trying to accomplish. Includes what will be improved, how much, and by when.
            </Paragraph>
            <Paragraph>
                <b>Change Idea:</b> An idea for a specific alteration that could be made to practice in service of creating improvement.
            </Paragraph>
            <Paragraph>
                <b>Current State:</b> A description of the status quo at the outset of the improvement effort. Could involve a mix of quantitative and qualitative data.
            </Paragraph>
            <Paragraph>
                <b>Empathy Interview:</b> A specific type of interview that focuses on uncovering the emotions, experiences, needs, and desires of stakeholders affected by the problem or the improvement work. Originates in the field of human-centered design.
            </Paragraph>
            <Paragraph>
                <b>Equity (Educational):</b> Each child receives what they need to develop to their full academic and social potential (National Equity Project, n.d.).
            </Paragraph>
            <Paragraph>
                <b>Fishbone Diagram:</b> A tool for identifying and relating root causes of a problem. Also may be referred to as a “causal system analysis” or “Ishikawa diagram.”
            </Paragraph>
            <Paragraph>
                <b>Improvement Science:</b> A disciplined and collaborative approach to problem-solving in organizations characterized by a thorough investigation of the gap to be addressed, rapid-cycle testing of ideas for change, and spread of promising changes in order to generate evidence about what changes produce improvement, for whom and under what conditions. Involves the integration of relevant content knowledge with improvement methods, which are drawn from experimental science, systems theory, psychology, statistics, human-centered design, and other fields (Institute for Healthcare Improvement, n.d.).
            </Paragraph>
            <Paragraph>
                <b>Learning Consolidation:</b> An effort to pause, take stock, and summarize key learning during or after an improvement effort. May include the documentation of promising change ideas that have been tested.
            </Paragraph>
            <Paragraph>
                <b>Measures:</b> Data that is collected and displayed in a way to inform ongoing improvement work. A typical project will have a small number of measures working in combination to help the team know if they have met their aim, are making progress in key areas, or are creating unintended consequences elsewhere in the system.
            </Paragraph>
            <Paragraph>
                <b>Oppression:</b> Systematic and intentional disadvantaging of a group of people based on their identity while advantaging members of the dominant group (gender, race, class, sexual orientation, language, etc.) (National Equity Project, n.d.).
            </Paragraph>
            <Paragraph>
                <b>Plan-Do-Study-Act Cycle:</b> A four-part mini-experiment in which a change idea is identified, and predictions are made about what will occur. Then the change idea is executed, data is collected, and predictions are compared to results. Finally, the improver decides what actions to take next.
            </Paragraph>
            <Paragraph>
                <b>Process Map:</b> A tool used to visualize the steps taken in work. May include details such as owners of key steps or common breakdowns. Also known as a “flow chart.”
            </Paragraph>
            <Paragraph>
                <b>System:</b> An interrelated set of people, tools, and processes that come together to accomplish a particular purpose.
            </Paragraph>
            <Paragraph>
                <b>Theory of Improvement:</b> A concise articulation of the key “drivers,” or high leverage areas, that an improvement team believes it needs to impact to reach the aim. Illustrates the hypothesized causal connection between change ideas and outcomes.
            </Paragraph>

            {/* References */}
            <Header>
                References
            </Header>
            <Paragraph>
                Anaissie, T., Cary, V., Clifford, D., Malarkey, T. & Wise, S. (2021) <Italic>Liberatory Design.</Italic> <ArticleLink href='https://www.liberatorydesign.com'>https://www.liberatorydesign.com</ArticleLink>.
            </Paragraph>
            <Paragraph>
                Ahlström, J. (2015). <Italic>How to Succeed with Continuous Improvement: A Primer for Becoming the Best in the World.</Italic> McGraw Hill.
            </Paragraph>
            <Paragraph>
                Bennett, B. & Provost, L. (2015) <Italic>What’s Your Theory? Quality Progress,</Italic> 48(7), 36-43.
            </Paragraph>
            <Paragraph>
                Berwick, D. (2004). <Italic>Speech at IHI National Forum.</Italic>
            </Paragraph>
            <Paragraph>
                Bryk, A.S., Gomez, L.M., Grunow, A. & LeMahieu, P.G. (2015). <Italic>Learning to Improve: How America’s Schools Can Get Better at Getting Better.</Italic> Harvard Education Press.
            </Paragraph>
            <Paragraph>
                Deming, W.E. (2000). <Italic>The New Economics: For Industry, Government, Education</Italic> (2nd ed.). MIT Press Books.
            </Paragraph>
            <Paragraph>
                Hasso Plattner Institute of Design at Stanford University. (2018). <Italic>Design Thinking Bootleg.</Italic> Retrieved March 29, 2021, from <ArticleLink href='https://dschool.stanford.edu/resources/design-thinking-bootleg'>https://dschool.stanford.edu/resources/design-thinking-bootleg</ArticleLink>.
            </Paragraph>
            <Paragraph>
                Hinnant-Crawford, B.N. (2020). <Italic>Improvement Science in Education: A Primer.</Italic> Myers Education Press.
            </Paragraph>
            <Paragraph>
                Institute for Healthcare Improvement. (n.d.). <Italic>Science of Improvement.</Italic> Retrieved May 29, 2021, from <ArticleLink href='https://www.ihi.org/about/Pages/ScienceofImprovement.aspx'>https://www.ihi.org/about/Pages/ScienceofImprovement.aspx</ArticleLink>.
            </Paragraph>
            <Paragraph>
                Jefferson, T. (1814). Letter from Thomas Jefferson to Peter Carr (September 7, 1814). (2020, December 7). In <Italic>Encyclopedia Virginia.</Italic>  <ArticleLink href="https://encyclopediavirginia.org/entries/letter-from-thomas-jefferson-to-peter-carr-september-7-1814/">https://encyclopediavirginia.org/entries/letter-from-thomas-jefferson-to-peter-carr-september-7-1814/</ArticleLink>.
            </Paragraph>
            <Paragraph>
                Ladson-Billings, G. (2006). From the Achievement Gap to the Education Debt: Understanding Achievement in U.S. Schools. <Italic>Educational Researcher,</Italic> 35(7), 3-12.
            </Paragraph>
            <Paragraph>
                Langley, G.J., Moen, R.D., Nolan, K.M., Nolan, T.W., Norman, C.L. & Provost, L.P. (2009). <Italic>The Improvement Guide: A Practical Approach to Enhancing Organizational Performance.</Italic> Jossey Bass.
            </Paragraph>
            <Paragraph>
                Lewis, A.E. & Diamond, J.B. (2015). <Italic>Despite the Best Intentions: How Racial Inequality Thrives in Good Schools.</Italic> Oxford University Press.
            </Paragraph>
            <Paragraph>
                Lucas, B. & Hadjer, N. (2015). <Italic>The Habits of an Improver: Thinking about learning for improvement in health care.</Italic> Health Foundation.
            </Paragraph>
            <Paragraph>
                National Equity Project. (n.d.). <Italic>Educational Equity Definition.</Italic> Retrieved March 29, 2021, from <ArticleLink href='https://www.nationalequityproject.org/education-equity-definition'>https://www.nationalequityproject.org/education-equity-definition</ArticleLink>.
            </Paragraph>
            <Paragraph>
                National Equity Project. (n.d.). <Italic>Lens of Systemic Oppression.</Italic> Retrieved March 29, 2021, from <ArticleLink href='https://www.nationalequityproject.org/frameworks/lens-of-systemic-oppression'>https://www.nationalequityproject.org/frameworks/lens-of-systemic-oppression</ArticleLink>.
            </Paragraph>

            {/* Acknowledgements */}
            <Header>
                Acknowledgements
            </Header>
            <Paragraph>
                These ideas are grounded in the work of the vibrant professional community of improvement scientists I have been privileged to belong to for the past eight years. In compiling this introductory essay, I have channeled the practices we have developed together and the insights we have shared as we apply improvement science towards creating a more just public education system. Much appreciation goes to my valued colleagues and fellow improvers at CORE Districts, Carnegie Foundation, National Education Association, New Tech Network, High Tech High, and the many other organizations that, together, have grown this field. Thank you to my improvement mentors Alicia Grunow, Sandra Park, Christina Dixon, and Brandon Bennett, for their investments in my growth and for their thoughtful feedback on this essay. Thanks also to Stacey Caillier, Michelle Pledger, and Daisy Sharrock, for encouraging me to write, creating a supportive environment in which to do it, and then offering spot-on suggestions for making this piece way better! Finally, gratitude to David Montes de Oca, for constantly modeling how to lead for equity through carefully chosen words, and of course, for teaching me the value of a good metaphor.
            </Paragraph>
        </ArticleFormat>
    );
}