import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from '@mui/material/Fade';


import Image from "next/image";
import ArticleFormat from "../articleFormat";

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

    return (
        <ArticleFormat
            {...info}
            >
            {/* Paragraph 1 */}
            <Typography variant="h4" sx={{fontWeight:'bold', my:'1rem'}}>
                What is improvement Science?
            </Typography>
            <Typography sx={{fontSize:'1.25rem', lineHeight:'2.5rem', mb:'2rem'}}>
                In education, fostering continuous improvement is crucial for student success. 
                Educators and administrators are increasingly adopting structured methodologies to refine their practices and make data-driven decisions. 
                Three key tools that are instrumental in this process are Improvement Science, the PDSA (Plan-Do-Study-Act) framework, and Driver Diagrams. 
                These tools, when used together, help shape professional learning communities (PLCs) into dynamic, results-oriented groups focused on ongoing growth.
            </Typography>
            {/* Paragraph 2 */}
            <Typography variant="h4" sx={{fontWeight:'bold', my:'1rem'}}>
                Improvement Science: A Methodology for Change
            </Typography>
            <Typography sx={{fontSize:'1.25rem', lineHeight:'2.5rem', mb:'2rem'}}>
                Improvement Science provides a systematic approach to enhancing educational outcomes. At its core, Improvement Science emphasizes that educational improvements should be driven by evidence and iterative cycles, rather than by top-down mandates or untested innovations. It prioritizes testing small changes, learning from them, and using data to guide the next steps, ensuring that changes are effective and sustainable.
            </Typography>
            <Typography sx={{fontSize:'1.25rem', lineHeight:'2.5rem', mb:'2rem'}}>
                In the context of PLCs, Improvement Science fosters a culture where educators work collaboratively to identify specific areas for improvement, test changes in their teaching methods, and evaluate their effectiveness. This iterative process allows educators to refine their strategies over time, ensuring that improvements are rooted in actual classroom experiences rather than theoretical models. By using evidence to inform decisions, educators create a shared understanding of what works and what doesn't, leading to better practices and, ultimately, improved student outcomes.
            </Typography>
        </ArticleFormat>
    );
}