import { redirect } from 'next/navigation'

export default async function ProjectsRedirect({params}) {
    const {aimId} = await params;
    // redirects if no team is selected in the url
    redirect(`./${aimId}/drivers`);
}
