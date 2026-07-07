//figma projects

import Link from "next/link";

function ContactForm() {
    return (
        <div id="contact-form">
            <h3>Get in touch</h3>
            <div id="contact-links">
                <a href="mailto:elianasobel610@gmail.com">elianasobel610@gmail.com</a>
                <Link href="https://www.linkedin.com/in/eliana-sobel-4b1801289/">LinkedIn</Link>
            </div>
        </div>
    );
}

export default ContactForm;
