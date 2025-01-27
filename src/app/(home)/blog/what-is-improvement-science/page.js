import ArticleFormat, { Header, LIParagraph, Paragraph } from "../articleFormat";
import NextLink from 'next/link';


export const info = {
    title: 'What is Improvement Science?',
    author: 'Derek Huang',
    length: '5',
    description: 'Learn what improvement science is and how it can lead to positive growth for your students.',
    href:'/blog/what-is-improvement-science',
    thumbnail:'/thumbnails/what-is-improvement-science-thumbnail.png',
    aspectRatio: 1594/1084, 
};

export default function Page() {

    const site = 'https://docs.google.com/document/d/1eRiXjBWCEhZeDuStHnhgIqdtHi3KlE6wYPECK5fn74I/edit?tab=t.0'

    return (
        <ArticleFormat
            {...info}
            >
            {/* What is improvement Science? */}
            <Header>
                What is improvement Science?
            </Header>
            <Paragraph>
                Improvement science is a belief and approach towards making changes in a system or organization that lead to improvement. Its foundational principle is the belief that all systems and organizations are perfectly designed to produce the outcomes they produce; thus, without any change introduced to the system or organization, no improvement will ever happen. This isn’t to say that change will always lead to improvement, but, without change, improvement will never happen.
            </Paragraph>
            <Paragraph>
                The approach of improvement science is the use of running iterative cycles of change for learning and improvement. These cycles are run at a small scale to maximize learning and minimize risk. When a change that leads to improvement is found, it is then scaled to a wider context, thus leading to maximized improvement with mitigated risks. With the combination of this belief and approach, improvement science has found itself quite popular–
                first starting in the <NextLink target="_blank" href='https://www.ihi.org/resources/how-improve-model-improvement'>healthcare system</NextLink> and now being applied to the education system.
            </Paragraph>

            {/* The PDSA Framework */}
            <Header>
                The PDSA Framework
            </Header>
            <Paragraph>
                The most common framework in improvement science is the Plan-Do-Study-Act (PDSA) Framework. This framework is often aided by other charts or diagrams like the Driver Diagram; nevertheless, the framework can be practiced in isolation. 
                The <NextLink target="_blank" href="https://www.apiweb.org/">Model for Improvement</NextLink> developed by W. Edwards Deming details the PDSA Framework in its simplest form. 
            </Paragraph>
            <Paragraph inline>
                The PDSA Framework focuses on three key questions to drive purposeful and effective improvement efforts:
            </Paragraph>
            <ol>
                <LIParagraph bolded>
                    <Paragraph bolded inline>
                        What are we trying to accomplish?
                    </Paragraph>
                </LIParagraph>
                <ul>
                    <LIParagraph>
                        Define a clear, specific, and measurable goal that aligns with the broader organizational priorities or desired outcomes.
                    </LIParagraph>
                    <LIParagraph>
                        Example: "Reduce late homework submissions by 20% within the next three months."
                    </LIParagraph>
                </ul>

                <LIParagraph bolded>
                    <Paragraph bolded inline>
                        How will we know that a change is an improvement?
                    </Paragraph>
                </LIParagraph>
                <ul>
                    <LIParagraph>
                        Identify metrics or indicators to measure success.
                    </LIParagraph>
                    <LIParagraph>
                        Example: Track the percentage of assignments submitted on time each week.
                    </LIParagraph>
                </ul>

                <LIParagraph bolded>
                    <Paragraph bolded inline>
                        What changes can we make that will result in improvement?
                    </Paragraph>
                </LIParagraph>
                <ul>
                    <LIParagraph>
                        Brainstorm and prioritize potential strategies, interventions, or process modifications to achieve the goal.
                    </LIParagraph>
                    <LIParagraph>
                        Example: Introduce reminder notifications for upcoming homework deadlines.
                    </LIParagraph>
                </ul>
            </ol>
            <Paragraph>
                All three questions must be answered for effective improvement work to happen–especially in education. Too often are initiatives in education introduced without an aim, measure, or clear change leading many educators to wonder about the purpose, effectiveness, or even the difference of any particular initiative. This leads to exhausted educators too tired to try new initiatives. However, if all three questions are answered, it can spark new hope and create a path toward meaningful change in education.
            </Paragraph>
            
            {/* The PDSA Cycle */}
            <Header>
                The PDSA Cycle
            </Header>
            <Paragraph>
                Once the three key questions are answered, one can begin running Plan-Do-Study-Act (PDSA) cycles on the changes identified. These cycles break change testing into manageable steps that enable testing, learning, and adapting in real-time. These small iterative cycles allow for minimized risks and increased flexibility to make sure that the new change introduced is implemented effectively leading to improvement.
            </Paragraph>
            <Paragraph inline>
                The PDSA cycle is named in such a way to help us remember each step in the cycle for improvement:
            </Paragraph>
            <ol>
                <LIParagraph bolded>
                    <Paragraph bolded inline>
                        Plan:
                    </Paragraph>
                </LIParagraph>
                <ul>
                    <LIParagraph>
                        Develop a detailed action plan to test a change, specifying what will be done, who will do it, where it will occur, and the anticipated results.
                    </LIParagraph>
                    <LIParagraph>
                        Example: "Create and send automated email reminders for homework deadlines to students in one class over two weeks. I predict that there will be a 25% increase in on-time homework submissions as a result of the change."
                    </LIParagraph>
                </ul>

                <LIParagraph bolded>
                    <Paragraph bolded inline>
                        Do:
                    </Paragraph>
                </LIParagraph>
                <ul>
                    <LIParagraph>
                        Implement the plan on a small scale, documenting what happens during the process.
                    </LIParagraph>
                    <LIParagraph>
                        Example: Send the reminders and observe how students respond, noting any challenges or unexpected reactions.
                    </LIParagraph>
                </ul>

                <LIParagraph bolded>
                    <Paragraph bolded inline>
                        Study:
                    </Paragraph>
                </LIParagraph>
                <ul>
                    <LIParagraph>
                        Analyze the results and compare them to the anticipated outcomes. Reflect on what worked, what didn’t, and why.
                    </LIParagraph>
                    <LIParagraph>
                        Example: Measure the on-time submission rates before and after the reminders and gather student feedback on their usefulness.
                    </LIParagraph>
                </ul>

                <LIParagraph bolded>
                    <Paragraph bolded inline>
                        Act:
                    </Paragraph>
                </LIParagraph>
                <ul>
                    <LIParagraph>
                        Based on the findings, decide on the next steps:
                    </LIParagraph>
                    <ul>
                        <LIParagraph>
                            <b>Adopt</b> the change if it works well.
                        </LIParagraph>
                        <LIParagraph>
                            <b>Adapt</b> the approach and run a new PDSA cycle if it shows promise but needs refinement.
                        </LIParagraph>
                        <LIParagraph>
                            <b>Abandon</b> the change if it is ineffective or counterproductive.
                        </LIParagraph>
                    </ul>
                    <LIParagraph>
                        Example: Expand reminders to additional classes or tweak the timing and frequency of notifications.
                    </LIParagraph>
                </ul>
            </ol>

            {/* Improvement Science in Education */}
            <Header>
                Improvement Science in Education
            </Header>
            <Paragraph>
                Improvement science is relatively new in education, but its popularity has spread quickly. Unlike traditional reforms that often rely on broad, one-size-fits-all solutions, improvement science emphasizes understanding the root causes of problems, using data to drive decisions, and testing small, iterative changes in real-world settings. This methodology actively involves educators, students, and communities in the improvement process, fostering collaboration and ownership. By focusing on context-specific solutions and continuously learning from what works, improvement science ensures that reforms are not only effective but also equitable and sustainable, breaking the cycle of initiative fatigue and slow progress that has long plagued education systems.
            </Paragraph>
            <Paragraph>
                As the main framework for Professional Learning Communities (PLCs), many PLCs have seen substantial measurable growth over the years. In one particular Algebra 1 team, they saw a 24% reduction in D/F rates while making sure that it was not a result of grade inflation. These improvements align with the framework because they provide clarity and purpose around everything in a PLC. Assessments no longer become data collection tools for administrators but for the improvement cycles. New initiatives become purposeful because they are defined by the ones implementing them. The power of change is handed back to the educator to make purposeful changes for improvement in their classroom alongside their colleagues. 
            </Paragraph>
            
            {/* Conclusion */}
            <Header>
                Conclusion
            </Header>
            <Paragraph>
                Improvement science represents a transformative approach to tackling the complex challenges in education by emphasizing clarity, collaboration, and purposeful action. Its iterative, data-driven nature allows educators to test changes, learn from real-world applications, and scale effective practices, ensuring that initiatives are meaningful and sustainable. By anchoring improvement efforts in the PDSA framework and addressing the root causes of systemic issues, educators are empowered to take ownership of change and drive measurable growth within their classrooms and professional learning communities. As educators continue to adopt this methodology, improvement science has the potential to not only revitalize teaching practices but also foster equity and excellence across educational systems.
            </Paragraph>
        </ArticleFormat>
    );
}