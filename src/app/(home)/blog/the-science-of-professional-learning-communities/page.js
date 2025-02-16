import ArticleFormat, { ArticleLink, Header, LIParagraph, Paragraph, SubHeader } from "../articleFormat";


export const info = {
    title: 'The Science of Professional Learning Communities',
    author: 'Derek Huang',
    length: '7',
    description: 'Learn about the intersection of Professional Learning Communities and Improvement Science.',
    href:'/blog/the-science-of-professional-learning-communities',
    thumbnail:'/thumbnails/the-science-of-professional-learning-communities.png',
    aspectRatio: 1594/1084, 
};

export default function Page() {

    const site = 'https://docs.google.com/document/d/1FsXVfZve5QucXdkxwZCmoXzsV-8tL-J0G-X3TJCxpNQ/edit?usp=sharing'

    return (
        <ArticleFormat
            {...info}
            >
            {/* What is a Professional Learning Communities (PLC)? */}
            <Header>
                What is a Professional Learning Communities (PLC)?
            </Header>
            <Paragraph inline>
                <ArticleLink href='https://allthingsplc.info/about/'>Richard DuFour</ArticleLink> defines it as an “ongoing process in which educators work collaboratively in recurring cycles of collective inquiry and action research to achieve better results for the students they serve.” 
                In practice, it is about engaging in collective inquiry about the following <ArticleLink href='https://allthingsplc.info/harnessing-the-collaborative-power-of-the-four-critical-questions-of-a-professional-learning-community/'>four guiding questions</ArticleLink> on a daily basis:
            </Paragraph>
            <ol>
                <LIParagraph>
                    What do we want students to know?
                </LIParagraph>
                <LIParagraph>
                    How will we know that they learned it?
                </LIParagraph>
                <LIParagraph>
                    What will we do if they did learn it?
                </LIParagraph>
                <LIParagraph>
                    What will we do if they didn’t learn it?
                </LIParagraph>
            </ol>
            <Paragraph>
                Admittedly, many implementations of a PLC fall short of the intent DuFour had for a PLC. For many educators, their experience resembles a Professional Working Community (PWC) where educators gather to work on lesson plans, plan assessments, and adjust pacing. Although these things are important and can be part of a cycle of inquiry, many PLCs miss the most crucial aspect of inquiry in a PLC: the learning. 
            </Paragraph>
            <Paragraph>
                The learning of the PLC is not just about student outcomes; It also includes the educator’s learning as they implement their lesson plans, assessments, or pacing. However, many PLCs implement changes without actually assessing how their practices impact student learning and outcomes. This often leads educators to rely on qualitative beliefs that their instruction is effective. This is a dangerous place to be because, more often than not, educators could overlook the ineffectiveness or, even worse, negative impacts of some of their practices. Furthermore, they may not even realize that the stress level could be reduced by simply removing ineffective practices. The goal of a PLC is to use data to collectively improve teaching practices and, in turn, increase student outcomes.
            </Paragraph>
            
            {/* Why Improvement Science for PLCs? */}
            <Header>
                Why Improvement Science for PLCs?
            </Header>
            <Paragraph>
                Although the four guiding questions help structure discussions within a PLC meeting, they do not explicitly require educators to analyze data for improvement. They often lead educators to implement practices they have used before without examining whether these practices work or require improvement. This is where improvement science proves valuable. By applying improvement science, educators can use concrete data to abandon ineffective practices while adapting and adopting new or refined practices to drive positive student outcomes.
            </Paragraph>
            <Paragraph>
                Furthermore, PLCs naturally align with the principles of improvement science described by the Carnegie Foundation for the Advancement of Teaching (<ArticleLink href='https://www.carnegiefoundation.org/about/improvement-in-education/six-core-principles-improvement/'>CFAT</ArticleLink>). 
                Specifically, PLCs are “networked communities” that “anchor practice implementation in disciplinary inquiry.” Instead of using the four guiding questions as the main framework, PLCs can share and improve practices through the adoption of the Plan-Do-Study-Act (PDSA) cycles to “to learn fast, fail fast, and improve quickly.” The improvement science provides a framework for improving instructional practices and for giving meaning to data such as grades–allowing it to be no longer a source of judgement for the students but as a source of learning for the educator to improve their practice. By using improvement science in PLCs, educators can shift their focus toward the original intent of a PLC: continuous learning.
            </Paragraph>

            {/* What does Improvement Science look like in a PLC? */}
            <Header>
                What does Improvement Science look like in a PLC?
            </Header>
            <Paragraph inline>
                To begin a cycle of inquiry, a PLC should answer three important questions from the Model for Improvement (MFT) by the <ArticleLink href='https://www.apiweb.org/'>Associates in Process Improvement</ArticleLink>:
            </Paragraph>
            <ol>
                <LIParagraph>
                    What are we trying to accomplish?
                </LIParagraph>
                <LIParagraph>
                    How will we know that a change is an improvement?
                </LIParagraph>
                <LIParagraph>
                    What changes can we make that will result in improvement?
                </LIParagraph>
            </ol>
            <Paragraph>
                These three questions help guide the PLC process toward learning and improvement. They provide clear goals, concrete measures, and specific practices to ensure that educators make informed decisions about effective practices.
            </Paragraph>

            <SubHeader>
                What are we trying to accomplish?
            </SubHeader>
            <Paragraph>
                The first question is similar to the first guiding question, “What do we want students to learn?” The key difference lies in shifting the perspective away from student efficacy to teacher efficacy. This shift matters because research by John Hattie indicates that collective teacher efficacy has one of the most significant impacts on student achievement. Instead of focusing on student capabilities, the question encourages reflection on what the educator feels they can or cannot accomplish. For example, a PLC might define its aim as: “The team aims to increase student clarity around grades.” With the aim defined, the PLC can align all practices toward achieving it.
            </Paragraph>
            
            <SubHeader>
                How will we know that a change is an improvement?
            </SubHeader>
            <Paragraph>
                The second question mirrors the second guiding question, “How will we know that they learned it?” Although similar, it maintains the shift away from student efficacy to teacher efficacy. Instead of focusing on student ability (or placing blame on them for a lack of progress), it prioritizes whether the practice being tested is effective. Furthermore, answering this question helps the team move beyond subjective impressions by establishing objective measures of effectiveness. For instance, a PLC might decide: “The team will measure student D/F rates as well as the number of students that can describe the meaning of their grade in terms of their learning.” This ensures the team uses evidence, rather than intuition, to assess instructional impact.
            </Paragraph>

            <SubHeader>
                What changes can we make that will result in improvement?
            </SubHeader>
            <Paragraph>
                The third question is similar to the last two guiding questions, “What will we do if they did learn it?” and “What will we do if they didn’t learn it?” Again, although these questions are similar, the focus shifts from student efficacy to teacher efficacy. Answering the two guiding questions does not resolve whether the practice is effective for students who have learned or not learned. Instead, investigating effective changes that will result in improvement addresses the two guiding questions as well as determines whether or not the practice implemented will be effective. To answer this third question, educators will need to discuss specific practices they want to try and test against the defined metric from earlier. An example of answering this question is “The team wants to try mastery-based rubric grading.” Once the team has identified a change, the team will have to test the change idea to learn if it is effective and how to most effectively adapt it to their specific classroom.
            </Paragraph>

            {/* Plan-Do-Study-Act (PDSA) Cycles */}
            <Header>
                Plan-Do-Study-Act (PDSA) Cycles
            </Header>
            <Paragraph>
                The PDSA cycle is crucial to improvement science. It is the machine or process that guides an inquiry cycle. It has been well adapted through the years to address everything an educator will need to learn and improve their change idea. A single change idea can have multiple PDSA cycles because, in each iteration of the cycle, the educator could realize that there is something else they want to learn or focus on.
            </Paragraph>
            
            <SubHeader>
                Plan
            </SubHeader>
            <Paragraph>
                The first step to a PDSA cycle is the “Plan” phase. In the planning of the cycle, the educator will identify the objective, plan the logistics (when, where, how), raise questions/concerns along with the educators prediction, and define the measures. For example, in testing mastery-based rubric grading, many educators on a team were concerned about whether students will engage with classwork if only the assessments were graded. As a result, in this first cycle, the objective was to learn about student engagement given the change idea. The logistics were to inform the students about the change and observe student engagement. The questions/concerns were “Will the students engage in classwork to learn so that they may demonstrate mastery during the assessment?” The predictions were “that there will be a 50% reduction in student engagement compared to before.” The key measures were the number of engaged students and the D/F rate on the upcoming assessment.
            </Paragraph>
            <Paragraph>
                Side note: It is crucial to document the team's predictions because comparing them to actual results helps surface underlying assumptions and deepens learning about the practice’s effectiveness.
            </Paragraph>

            <SubHeader>
                Do
            </SubHeader>
            <Paragraph>
                The second step of a PDSA cycle is the “Do” phase. In this part of the cycle, it is exactly as the name describes. The “Do” phase is when the team implements the plan and writes down observations and collects data based on the measures defined in the “Plan” phase. For the earlier example on mastery-based rubric grading, the team observed that students engaged just as much as before measuring a 0% reduction in student engagement. Furthermore, several team members observed that many students were also engaged with the learning for the purpose of learning rather than points leading to a 24% reduction in the D/F rate. In the “Do” phase, educators collected the data to prepare for a future PLC meeting to analyze the data.
            </Paragraph>

            <SubHeader>
                Study
            </SubHeader>
            <Paragraph>
                The third step of a PDSA cycle is the “Study” phase. In this part of the cycle, the team met together to discuss the results of the implementation and compare it with the predictions. Because the predictions were made beforehand, educators were able to reflect on their underlying assumptions about student motivation. Unlike the traditional four guiding questions of a PLC, this step shifted the attention to teacher efficacy. Without this shift, the team would have overlookwed their own biases and assumptions that influence student outcomes. If the PLC was doing separate testing on the same change idea, this part of the cycle is where they will be able to share about the discoveries they individually have made and have the data and context as quantitative evidence for the effectiveness of a practice. Overall, the “Study” phase is where the learning in a PLC happens.
            </Paragraph>

            <SubHeader>
                Act
            </SubHeader>
            <Paragraph>
                The final step of a PDSA cycle is the “Act” phase. It is in this part that the team decides if they want to adapt, adopt, or abandon the change. If the team chooses to adopt or abandon, then they have decided that they have learned enough about an idea backed with evidence to adopt an idea as a permanent practice or abandon the idea as ineffective for their specific context. If the team chooses to adapt, they will explain the reason they decided to adapt and begin a new cycle of inquiry. For the earlier example, the team decided to adapt the mastery-based rubric grading because they noticed as time went on that student engagement decreased because the students felt the work was too easy. In this new cycle of inquiry, they wanted to see if increasing the difficulty and learning of the assessment will result in higher engagement. From there, the team began a new cycle and a new journey of learning.
            </Paragraph>

            {/* Conclusion */}
            <Header>
                Conclusion
            </Header>
            <Paragraph>
                A truly effective Professional Learning Community (PLC) is not just about collaborative work—it’s about learning. While many PLCs unintentionally become Professional Working Communities (PWC) focused on logistical tasks, the heart of a PLC lies in collective inquiry, reflection, and improvement. Without a structured approach to assessing and refining instructional practices, educators risk reinforcing ineffective methods rather than evolving toward more impactful teaching strategies.
            </Paragraph>
            <Paragraph>
                Improvement science provides the missing link. By integrating Plan-Do-Study-Act (PDSA) cycles, PLCs shift their focus from routine discussions to evidence-based decision-making that fosters both teacher and student growth. This approach ensures that PLCs are not just spaces for planning but laboratories for learning–where practices are tested, assumptions are challenged, and real improvements are made.
            </Paragraph>
            <Paragraph>
                Ultimately, the integration of PLCs and improvement science empowers educators to embrace a mindset of continuous learning. It moves the conversation from student capacity to teacher growth. With a commitment to collective inquiry and improvement, PLCs can become powerful engines of change, leading to greater teacher efficacy, informed instructional decisions, and, most importantly, better student outcomes.
            </Paragraph>
        </ArticleFormat>
    );
}