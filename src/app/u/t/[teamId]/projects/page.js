import { redirect } from 'next/navigation'

export default function ProjectsRedirect() {
    // redirects if no team is selected in the url
    redirect('./projects/drivers');
}
