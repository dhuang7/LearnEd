import ArticleFormat, { ArticleLink, Header, LIParagraph, Paragraph, SubHeader } from "../articleFormat";


export const info = {
    title: 'Overcoming Challenges in PLC',
    author: 'Douglas Fisher',
    length: '3',
    description: 'Understanding the challenges that prevent teams from developing collective responsibility and collective efficacy can help us mitigate the barriers.',
    href:'/blog/overcoming-challenges-in-plc',
    thumbnail:'/thumbnails/overcoming-challenges-in-plc.webp',
    aspectRatio: 2121/1414, 
};

export default function Page() {

    const site = 'https://corwin-connect.com/2023/03/overcoming-challenges-in-plc/'

    return (
        <ArticleFormat
            {...info}
            >
            {/* credit */}
            <Paragraph inline color='textSecondary' sx={{fontStyle:'italic', fontSize: '1rem', lineHeight:'1.25rem'}}>
                The blog first appeared on <ArticleLink href='https://corwin-connect.com/2023/03/overcoming-challenges-in-plc/'>Corwin-Connect.com</ArticleLink>. With permission of Douglas Fisher, we are honored to be able to post the blog below as a resource so that others may be able to learn from his expertise.
            </Paragraph>

            {/* Overcoming Challenges in PLC */}
            <Header>
                Overcoming Challenges in PLC
            </Header>
            <Paragraph>
                Professional Learning Communities (PLCs) have been around since the 1970s and show great promise in improving student outcomes. Educator collaboration, collective responsibility, and collective learning have become increasingly necessary in the dynamic landscape of education. However, less-than-ideal implementation of effective PLCs is far too common. Unstructured, top-down hierarchical structures, and disengagement often plague teams that are charged with collaboration.
            </Paragraph>
            
            {/* Challenge 1: An overreliance on common formative assessments as a means for determining impact. */}
            <Header>
                Challenge 1: An overreliance on common formative assessments as a means for determining impact.
            </Header>
            <Paragraph inline>
                Common formative assessments can be beneficial, but they are not the only way teams can discuss their impact. Teachers are pressed for time and assessment design is time-consuming, especially if they are to be valid measurements of learning.  Without a significant investment, CFAs yield less-than-ideal return on investment.  Further, the focus on testing destabilizes a balanced assessment system because a series of tests detracts from more authentic means of teaching and learning.
            </Paragraph>
            <ul>
                <LIParagraph>
                    <b>Solution:</b> Focus on evidence of learning using the feedback loop: Where are we going? Where are we now? Where to next? When we focus on patterns of conception and misconception in student work samples as evidence of student learning, we’re able to ascertain the gap between where we want students to be and their current level of understanding so that we can determine our next steps. Analyzing correctness/incorrectness based on A, B, C, or D from a common formative assessment gives us little insight into student learning; thus, we shift the focus to analyzing evidence of learning as part of the PLC process to gain a richer understanding of student performance. This helps teams collectively think through strategies and practices that support learners who are at different stages of learning.
                </LIParagraph>
            </ul>

            {/* Challenge 2: PLC as a grade-level, content-specific team, instead of a schoolwide horizontal and vertical process. */}
            <Header>
                Challenge 2: PLC as a grade-level, content-specific team, instead of a schoolwide horizontal and vertical process.
            </Header>
            <Paragraph inline>
                Administrative teams often do not know what to do with singletons and/or teachers who teach multiple classes. As a result, these teachers are either placed on a team where they disengage, or the conversations are reduced to superficial talk that feels like a meeting and becomes increasingly detrimental to productivity. Further, when teachers only talk with peers who teach the same thing they do, vertical alignment conversations are limited. When this occurs, redundancy and gaps in the content are introduced because educators are not sure what has come before or where learning is going once their students leave them.
            </Paragraph>
            <ul>
                <LIParagraph>
                    <b>Solution:</b> Use multiple data types (quantitative: standardized tests, universal screeners, discipline referrals, teacher evaluations, ASVAB, SAT/ACT; qualitative: work samples, student surveys, focus groups, teacher spot observations, coaching plans, culture and climate surveys) to triangulate potential schoolwide challenges that all teachers can engage in productively to satisfy their own classroom needs and, ultimately, increase student outcomes.  Common challenges can be
                </LIParagraph>
                <ul>
                    <LIParagraph>
                        academic (using evidence to support assertions; developing ideas for writing; explaining strategies and thought processes),
                    </LIParagraph>
                    <LIParagraph>
                        disposition or behavior-oriented (students monitoring their own progress through self-assessment; strengthening perseverance; increasing collaboration with peers),
                    </LIParagraph>
                    <LIParagraph>
                        and/or habit-building (deepening students study skills)
                    </LIParagraph>
                </ul>
            </ul>
            <Paragraph>
                And then, form teams that can address these challenges collaboratively.  It may be that grade-level or content-area teams work to address the challenges.  Or it may be that teams need to represent a range of topics to address the challenges their school is facing.  Of course, all teams still need to discuss evidence of impact, but they can extend their conversations vertically and reduce the isolation that can be present when teams are limited to course-alike membership.  By identifying common challenges that span contents and grade-levels, teachers can collaborate vertically and horizontally to best meet the needs of the whole child and increase the collective impact of all teachers on campus.
            </Paragraph>

            {/* Challenge 3: Ineffective adult collaboration. */}
            <Header>
                Challenge 3: Ineffective adult collaboration.
            </Header>
            <Paragraph inline>
                A one-size-fits-all PLC approach doesn’t support campuses in collaborating effectively. PLCs are only as effective as the degree to which the interventions and strategies carry over to classroom practice; when the lead or the veteran teacher with the best results takes center stage, PLC happens TO people instead of WITH them. As a result, teachers mimic collaboration only to have each return to their classrooms what they think will work. Time is a commodity of which we never have enough; thus, often we find it quicker and more efficient to just have one person in the PLC tell everyone else what to do because even adults struggle to collaborate effectively, especially when there are singletons, new teachers, and varying levels of content and pedagogical knowledge.
            </Paragraph>
            <ul>
                <LIParagraph>
                    <b>Solution:</b> Establish collaborative structures that allow all participants an equitable voice. This may seem cumbersome and time-consuming at first, but the deliberate practice of active engagement and contribution to a team as a norm paves the way for future strong collaborative learning communities. Teams need agreements about how they will operate as well as protocols for how they work.  For example, teams may need a data discussion protocol that allows them to stay focused on what the evidence says. Or teams may need a protocol that helps them address unfinished learning.  Much like protocols for student learning (e.g., jigsaw, reciprocal teaching), educators benefit when they start with a structure that builds their confidence and comfort. We’re in education for students, not only to increase their academic performance and knowledge but also to help them hone their social and emotional skills. Developing these same ideas for teachers: increasing content and pedagogical content knowledge, collaboration, and belonging will help us transform the educational experience for the students we serve.
                </LIParagraph>
            </ul>
            
            
        </ArticleFormat>
    );
}