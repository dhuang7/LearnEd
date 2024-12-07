import { redirect } from 'next/navigation'

export default function TeamRedirect() {
    // redirects if no team is selected in the url
    redirect('/u/teams');
}
