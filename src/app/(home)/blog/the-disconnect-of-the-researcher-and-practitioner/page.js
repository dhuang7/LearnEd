import ArticleFormat, { ArticleLink, Header, LIParagraph, Paragraph, SubHeader } from "../articleFormat";


export const info = {
    title: 'The Disconnect of the Researcher and Practitioner',
    author: 'Derek Huang',
    length: '4',
    description: 'Why is there such a large gap between the research and the practitioners? Learn about the problems of many school initiatives and the solution to true improvement.',
    href:'/blog/the-disconnect-of-the-researcher-and-practitioner',
    thumbnail:'/thumbnails/the-disconnect-of-the-researcher-and-practitioner.png',
    aspectRatio: 1594/1084, 
};

export default function Page() {

    const site = 'https://docs.google.com/document/d/1vWxsvu1jMAIhwzzlWGV9I0aP8612TP0vL7mYIwbk-f4/edit?usp=sharing'

    return (
        <ArticleFormat
            {...info}
            >
            {/* The Introduction */}
            <Header>
                The Introduction
            </Header>
            <Paragraph>
                Education is filled with passionate, hardworking practitioners (teachers) who want the best for their students. Yet, despite decades of research and countless initiatives, we see persistent inequities and underwhelming outcomes. Why does education struggle to improve? The answer lies in the disconnect between research and practice, the fragmented nature of educational reform, and the non-existant system for improvement.
            </Paragraph>
            <Paragraph>
                What if there was a better way? What if schools had a framework that empowered teachers to learn, test, and improve their practice? Professional Learning Communities (PLCs) driven by improvement science offer exactly that–a framework to meaningful and lasting change.
            </Paragraph>
            
            {/* The Disconnect */}
            <Header>
                The Disconnect
            </Header>
            <Paragraph>
                As much as our modern world might disagree, educational research doesn’t suck. The reality is its implementation does. It’s important to acknowledge that the problem isn’t a lack of good research. 
                Scholars like John Hattie (<ArticleLink href='https://www.visiblelearning.com/'>Visible Learning</ArticleLink>) and 
                organizations like the <ArticleLink href='https://www.carnegiefoundation.org/'>Carnegie Foundation for the Advancement of Teaching</ArticleLink> have provided extensive evidence on effective strategies and practices in education. The issue lies in translating this research into everyday school and classroom practice. Effective implementation requires consistent time for reflection, a commitment to collaborative learning, and a system for continuous improvement.
            </Paragraph>
            <Paragraph>
                Educational research is invaluable, but much of it remains trapped in academia. It’s often inaccessible to teachers, written in jargon-heavy language, and detached from classroom realities. Teachers are expected to adopt evidence-based practices without time, support, or context for effective implementation. Even when research does reach schools, it’s often presented as a watered down, one-size-fits-all solution; but, every classroom is different. Without space for adaptation, even the best strategies fall flat.
            </Paragraph>
            <Paragraph>
                Furthermore, education is notorious for its revolving door of new initiatives. One year, it’s focus is on project-based learning while, the next year, it’s on literacy-first instruction. These short-term, half-hearted implementations of programs often lack any clear goal for improvement for the system at large and exist solely to boost the appearance of transient improvement. As a result, teachers are left to juggle multiple priorities without a clear vision or passion. The result? Burnout, frustration, and practices that don’t stick.
            </Paragraph>
            <Paragraph>
                Lastly, educator time and expertise is often not valued. Educators are the end users of research yet their thoughts are not valued and their time is not appreciated. Teachers are already balancing heavy workloads; and, professional development and reflections often get squeezed into one-off workshops with little follow-up. Sustained improvement requires consistent dedicated time for reflection, collaboration, and iterative learning. Without that, even the best strategies rarely lead to effective long-term change.
            </Paragraph>

            {/* The Solution */}
            <Header>
                The Solution
            </Header>
            <Paragraph>
                Professional Learning Communities (<ArticleLink href='https://allthingsplc.info/'>PLCs</ArticleLink>) are collaborative groups of educators focused on collective learning and shared responsibility. Advocated by Richard DuFour, PLCs encourage teachers to analyze student data, reflect on practice, and co-create solutions. PLCs foster a culture of trust and accountability, where educators learn from one another and align their efforts toward a common goal.
            </Paragraph>
            <Paragraph>
                PLCs are the solution to this issue of research and practice. When done well, PLCs create the conditions for sustainable improvement. They provide time for reflection, collaborative problem-solving, and data-driven decisions. Teachers are given the space to evaluate their practices and explore new ideas; teams can work together to address challenges and share strategies; and, PLCs are able to use student data to guide their efforts and measure their impact.
            </Paragraph>
            <Paragraph inline>
                Furthermore, these collaborative environments can then be guided by a <ArticleLink href='http://www.apiweb.org/'>Model for Improvement</ArticleLink> to foster effective digestion, adaption, and implementation of evidence-based practices. Improvement science offers a framework for making incremental, evidence-based changes. 
                The core component of this approach–Plan-Do-Study-Act (<ArticleLink href='https://www.learnedplc.com/blog/the-science-of-professional-learning-communities'>PDSA</ArticleLink>) cycle–helps educators:
            </Paragraph>
            <ul>
                <LIParagraph>
                    <b>Plan:</b> Identify a problem and develop a hypothesis.
                </LIParagraph>
                <LIParagraph>
                    <b>Do:</b> Implement a small-scale change.
                </LIParagraph>
                <LIParagraph>
                    <b>Study:</b> Collect and analyze data to assess impact.
                </LIParagraph>
                <LIParagraph>
                    <b>Act:</b> Refine the strategy based on findings.
                </LIParagraph>
            </ul>
            <Paragraph>
                By combining the collaborative power of PLCs with the disciplined inquiry of improvement science, schools can create a system for continuous learning and evidence-based adaptation.
            </Paragraph>

            {/* The Change */}
            <Header>
                The Change
            </Header>
            <Paragraph>
                For an ineffective implementation of the solution, change needs to happen. The biggest changes will be around valuing teacher time and expertise. For time, education needs to provide consistent dedicated time for teacher growth. Schools must carve out protected time for PLCs to ensure that collaboration and reflection become a regular and valuable practice. For expertise, teachers should be seen not just as implementers, but as co-creators of educational improvement. Their classroom experience provides essential insights for improving research-based strategies. Empowering teachers as leaders in the improvement process fosters ownership, creativity, and true innovation.
            </Paragraph>
            <Paragraph>
                It should also be said that the recent push for certain education reform such as school choice and merit-based pay often pits schools and teachers against each other. If such reforms happen, improvement will not happen because improvement thrives on collaboration and not competition.
            </Paragraph>

            {/* The Conclusion */}
            <Header>
                The Conclusion
            </Header>
            <Paragraph>
                Education doesn’t need more isolated, half-hearted initiatives. It needs a system for continuous improvement and learning. PLCs, guided by improvement science, offer a proven model for lasting change. But for this to work, education must prioritize protected time, value teacher expertise, and focus on collaboration and shared learning. When educators have the space and support to improve, everyone wins.
            </Paragraph>

            {/* Further Reading: */}
            <SubHeader>
                Further Reading:
            </SubHeader>
            <ul>
                <LIParagraph>
                    <Paragraph color='textSecondary' inline>
                        <ArticleLink href='https://www.amazon.com/Visible-Learning-Synthesis-Meta-Analyses-Achievement/dp/0415476186'><span style={{fontStyle:'italic'}}>Visible Learning</span></ArticleLink> by John Hattie
                    </Paragraph>
                </LIParagraph>
                <LIParagraph>
                    <Paragraph color='textSecondary' inline>
                        <ArticleLink href='https://www.solutiontree.com/learning-by-doing-fourth-edition.html'><span style={{fontStyle:'italic'}}>Learning by Doing: A Handbook for Professional Learning Communities at Work</span></ArticleLink> by Richard DuFour
                    </Paragraph>
                </LIParagraph>
                <LIParagraph>
                    <Paragraph color='textSecondary' inline>
                        <ArticleLink href='https://www.amazon.com/exec/obidos/asin/0470192410/qualityhealth-20'><span style={{fontStyle:'italic'}}>The Improvement Guide: A Practical Approach to Enhancing Organizational Performance</span></ArticleLink> by Associates in Process Improvement
                    </Paragraph>
                </LIParagraph>
                <LIParagraph>
                    <Paragraph color='textSecondary' inline>
                        Carnegie Foundation for the Advancement of Teaching: <ArticleLink href='https://www.carnegiefoundation.org/'>https://www.carnegiefoundation.org/</ArticleLink>
                    </Paragraph>
                </LIParagraph>
                <LIParagraph>
                    <Paragraph color='textSecondary' inline>
                        Institute for Healthcare Improvement (IHI): <ArticleLink href='https://www.ihi.org/'>https://www.ihi.org/</ArticleLink>
                    </Paragraph>
                </LIParagraph>
            </ul>
        </ArticleFormat>
    );
}