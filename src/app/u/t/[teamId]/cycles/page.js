import { redirect } from 'next/navigation'

export default function CyclesRdirect() {
    // redirects if no team is selected in the url
    redirect('./cycles/drivers');
}
