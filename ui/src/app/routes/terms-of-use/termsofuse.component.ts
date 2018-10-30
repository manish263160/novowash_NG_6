import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "tou",
    styleUrls: ["./termsofuse.component.scss"],
    templateUrl: "./termsofuse.component.html",
})

export class TermsOfUseComponent implements OnInit, OnDestroy {
    public touIntro: any;
    public touItems: any[];

    constructor(
        private router: Router,
    ) {}

    public ngOnInit() {
        this.touIntro = {
            question: "Introduction",
            answer: 'www.novowash.com is an online portal, owned by Novoweb Ventures Pvt Ltd, a private limited company incorporated in India, for providing hyper-local services to customers.',
        };
        this.touItems = [{
            question: "General",
            preanswer: "By using the Website, you represent and warrant that you have the right, authority, and capacity to enter into this Agreement and to abide by all of the terms and conditions of this Agreement.",
            answer: '“www.novowash.com” (hereinafter, the “Website”) is owned and operated by Novoweb Ventures Private Limited (“Company”, “novowash”), a company incorporated under the Companies Act, having its registered office at Mumbai 400042,India. You are advised to read and understand these Terms carefully as moving past the home page, or using any of the services shall be taken to mean that You have read and agreed to all of the policies, which constitute a legally binding agreement between you and the website. These terms are to be read along with the Privacy Policy and any other policies on the website. This document is an electronic record published in accordance with the provisions of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the Rules and Regulations, Privacy Policy and Terms of Service for access or usage of the website and being generated by a computer system, it does not require any physical or digital signatures. For the purpose of these Terms of Use, along with any amendments to the same, and wherever the context so requires “You”, “Your” or “User” refer to the person visiting, accessing, browsing through and/or using the Website at any point in time. The term “We”, “Us”, “Our” shall mean and refer to the website and/or the Company, depending on the context. The headings of each section in this Agreement are only for the purpose of organising the various provisions under this Agreement in an orderly manner. These headings shall not be used by either party to interpret the provisions contained under them in any manner. Further, the headings have no legal or contractual value. We hold the sole right to modify the Terms of Service without prior permission from You or providing notice to You. The relationship creates on You a duty to periodically check the Terms of Service and stay updated on its requirements. If You continue to use the Website or avail any of its services without registration following such change, this is deemed as consent by You to the so amended policies. Your continued use of the Website is conditioned upon your compliance with the Terms of Service, including but not limited to compliance with the Terms of Service even after alterations, if any.',
        }, {
            question: "Services Overview",
            answer: 'The Website is an online platform where users can book serives for cleaning their homes and automobiles right at their door step. The platform provides easy booking for the customer and helps him/her choose a sutaible date and time for his service.',
        }, {
            question: "Registration",
            answer: 'To use the services provided on the website and make purchases, the user may create an account. The account on the Website shall collect only Your basic information. To create an account, you need to choose a username and password. You also have the option of linking your social media accounts, such as Your Facebook or Google Plus account with the Novowash account, to create your Novowash Account. You must keep your account and registration details current and correct for communications related to your purchases from the Website. At the time of registration, the Company shall collect the following personally identifiable information about you: Name - including first and last name, email address, mobile phone number and other contact details, demographic profile (like your age, gender, address, etc.,). If you choose to link your social media account with your Novowash Account, we collect basic information about you from those social media platforms, such as: name, age, gender, location and e-mail address. Information collected about you is subject to the Privacy Policy of the Company, which may be read as part and parcel of these Terms of Use. You are solely responsible for protecting the confidentiality of your username and password and any activity under the account will be deemed to have been done by you. In the event you provide us with false/inaccurate details or the Company has a reasonable ground to believe that false and inaccurate information has been furnished, we hold the right to permanently suspend your account.',
        }, {
            question: "Eligibility",
            answer: 'Services on the Site would be available to only select geographies in India. Persons who are “incompetent to contract” within the meaning of the Indian Contract Act, 1872 including minors, un-discharged insolvents etc. are not eligible to use the Site. However, if you are a minor, i.e. under the age of 18 years and over the age of 13 years, you may use the Site under the supervision of a parent or legal guardian who agrees to be bound by these Terms of Use. Novowash reserves the right to terminate or refuse your registration, or refuse to permit access to the Site, if it is discovered or brought to its notice that you are a minor.',
        }, {
            question: "Security",
            answer: 'Transactions on the Website are secure and protected. Any information entered by the User when transacting on the Website is encrypted to protect the User against unintentional disclosure to third parties. The User’s credit and debit card information is not received, stored by or retained by the Company / Website in any manner. This information is supplied by the User directly to the relevant payment gateway which is authorized to handle the information provided, and is compliant with the regulations and requirements of various banks and institutions and payment franchisees that it is associated with.',
        }, {
            question: "License and Access",
            answer: 'The Company grants you a limited sub-license to access and make personal use of the Site, but not to download (other than page caching) or modify it, or any portion of it, except with express written consent of the Company. Such limited sub- license does not include/permit any resale or commercial use of the Site or its contents; any collection and use of any product listings, descriptions, or prices; any derivative use of the Site or its contents; any downloading or copying of information for the benefit of another merchant; or any use of data mining, robots, or similar data gathering and extraction tools. Any portion of the Site may not be reproduced, duplicated, copied, sold, resold, visited, or otherwise exploited for any commercial purpose without express written consent of the Company. You may not frame or utilize framing techniques to enclose any trademark, logo, or other proprietary information (including images, text, page layout, or form) of the Website or of the Company and/or its affiliates without the express written consent of the Company. You may not use any meta tags or any other “hidden text” utilizing the Company’s name or trademarks without the express written consent of the Company. You shall not attempt to gain unauthorized access to any portion or feature of the Site, or any other systems or networks connected to the Site or to any server, computer, network, or to any of the services offered on or through the Site, by hacking, ‘password mining’ or any other illegitimate means. You hereby agree and undertake not to host, display, upload, modify, publish, transmit, update or share any information which: 1.belongs to another person and to which you do not have any right; 2.is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, paedophilic, libellous, invasive of another’s privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatever; 3.harms minors in any way; 4.infringes any patent, trademark, copyright or other proprietary/intellectual property rights; 5.violates any law for the time being in force; 6.deceives or misleads the addressee about the origin of such messages communicates any information which is grossly offensive or menacing in nature; 7.impersonates another person; 8.contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource; 9.threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign states, or public order or causes incitement to the commission of any cognizable offence or prevents investigation of any offence or is insulting any other nation; or 10.is misleading or known to be false in any way.',
        }, {
            question: "Communications",
            answer: 'By using this Website, it is deemed that you have consented to receiving calls, autodialed and/or pre-recorded message calls, e-mails, from Us at any time with the use of the telephone number and e-mail address that has been provided by you for the use of this website which are subject to the Privacy Policy. The user agrees to receive promotional communication and newsletters from the Company and its partners. This includes contacting you through information received through other parties. The use of this website is also your consent to receive SMSes from Us at any time we deem fit. This consent to be contacted is for purposes that include and are not limited to clarification calls and marketing and promotional calls. The user can opt out from such communication and/or newsletters either by unsubscribing on the Website itself, or by contacting the customer services team and placing a request for unsubscribing by sending an email to support+terms@Novowash.com. You may also be contacted by Service Providers with whom we have entered into a contract in furtherance of our rights, duties and obligations under this document and all other policies followed by Us. Such contact will be made only in pursuance of such objectives, and no other calls will be made. The sharing of the information provided by you will be governed by the Privacy Policy and We will not give out such contact information of yours to third parties not connected with the Website.',
        }, {
            question: "Payment",
            answer: 'The following payment options are available on the Application: 1.Domestic and international credit cards issued by banks and financial institutions that are part of the Visa, Master Card & Amex Card networks; 2.Visa & Master Card Debit cards; 3.Netbanking/Direct Debit payments from select banks in India. A list of available options will be made available at the time of the Purchase. 4.Cash Pick Up 5.Payment Wallets As prescribed by the financial institutions issuing the credit or debit cards affiliated with Visa / Master Card / Amex, the User will be required to submit his/her 16-digit card number, card expiry date and 3-digit CVV number (usually on the reverse of the card) while making an online transaction. The User must also have enrolled his/her card with VBV (Verified by Visa), MSC (MasterCard Secure Code) or any other applicable provider in order to complete the transaction. The User is hereby expressly made aware that his/her card statements will reflect that a payment has been made in favour of the Company. The User is further aware that in case of third party statements, including bank and credit card statements, the merchant name may appear in an abbreviated format, and the Company has no control over the same. To successfully subscribe on the Website, the User is required to complete the transaction by making the payment for the services opted for.',
        }, {
            question: "User Obligations",
            answer: 'You are a restricted user of this website. You are bound not to cut, copy, distribute, modify, recreate, reverse engineer, distribute, disseminate, post, publish or create derivative works from, transfer, or sell any information or software obtained from the website. With our prior permission limited use may be allowed. For the removal of doubt, it is clarified that unlimited or wholesale reproduction, copying of the content for commercial or non-commercial purposes and unwarranted modification of data and information within the content of the Website is not permitted. You agree not to access (or attempt to access) the Website and/or the materials or Services by any means other than through the interface that is provided by the website. The use of deep-link, robot, spider or other automatic device, program, algorithm or methodology, or any similar or equivalent manual process, to access, acquire, copy or monitor any portion of the Website or Content, or in any way reproduce or circumvent the navigational structure or presentation of the Website, materials or any Content, to obtain or attempt to obtain any materials, documents or information through any means not specifically made available through the Website. You acknowledge and agree that by accessing or using the Website or Services, You may be exposed to content from other users that You may consider offensive, indecent or otherwise objectionable. We disclaim all liabilities arising in relation to such offensive content on the Website. Further, You may report such offensive content. In places where this website allows you to post or upload data/information, You undertake to ensure that such material is not offensive and in accordance with applicable laws. Further, You undertake not to: Abuse, harass, threaten, defame, disillusion, erode, abrogate, demean or otherwise violate the legal rights of others; Engage in any activity that interferes with or disrupts access to the Website or the Services (or the servers and networks which are connected to the Website); Impersonate any person or entity, or falsely state or otherwise misrepresent Your affiliation with a person or entity; Publish, post, disseminate, any information which is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, pedophilic, libelous, invasive of another\'s privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatever; or unlawfully threatening or unlawfully harassing including but not limited to "indecent representation of women" within the meaning of the Indecent Representation of Women (Prohibition) Act, 1986; Post any file that infringes the copyright, patent or trademark of other legal entities; Upload or distribute files that contain viruses, corrupted files, or any other similar software or programs that may damage the operation of the Website or another\'s computer; Download any file posted by another user that you know, or reasonably should know, cannot be legally distributed in such manner; Probe, scan or test the vulnerability of the Website or any network connected to the Website, nor breach the security or authentication measures on the Website or any network connected to the Website. You may not reverse look-up, trace or seek to trace any information on any other user, of or visitor to, the Website, or any other customer of the website, including any website Account not owned by You, to its source, or exploit the Website or Service or information made available or offered by or through the Website, in any way whether or not the purpose is to reveal any information, including but not limited to personal identification information, other than Your own information, as provided for by the Website; Disrupt or interfere with the security of, or otherwise cause harm to, the Website, system resources, accounts, passwords, servers or networks connected to or accessible through the Website or any affiliated or linked sites; Collect or store data about other users in connection with the prohibited conduct and activities set forth in this Section; Use the Website or any material or Content for any purpose that is unlawful or prohibited by these Terms of Service, or to solicit the performance of any illegal activity or other activity which infringes the rights of this website or other third parties; Violate any code of conduct or other guidelines, which may be applicable for or to any particular Service; Violate any applicable laws or regulations for the time being in force within or outside India; Violate the Terms of Service including but not limited to any applicable Additional Terms of the Website contained herein or elsewhere; Violate any code of conduct or other guidelines, which may be applicable for or to any particular Service; Threaten the unity, integrity, defense, security or sovereignty of India, friendly relations with foreign states, or public order or cause incitement to the commission of any cognizable offence or prevent investigation of any offence or is insulting any other nation; Publish, post, disseminate information that is false, inaccurate or misleading; violate any applicable laws or regulations for the time being in force in or outside India; Directly or indirectly, offer, attempt to offer, trade or attempt to trade in any item, the dealing of which is prohibited or restricted in any manner under the provisions of any applicable law, rule, regulation or guideline for the time being in force; Create liability for Us or cause Us to lose (in whole or in part) the services of Our internet service provider ("ISPs") or other suppliers. You shall not engage in advertising to, or in solicitation of, other Users of the Website to buy or sell any products or services, including, but not limited to, products or services related to that being displayed on the Website or related to us. You may not transmit any chain letters or unsolicited commercial or junk email to other Users via the Website. It shall be a violation of these Terms of Service to use any information obtained from the Website in order to harass, abuse, or harm another person, or in order to contact, advertise to, solicit, or sell to another person other than Us without Our prior explicit consent. We can (and You hereby expressly authorize Us to) disclose any information about You to law enforcement or other government officials, as we, in our sole discretion, believe it necessary or appropriate in connection with the investigation and/or resolution of possible crimes, especially those that may involve personal injury. In order to protect Our Users from such advertising or solicitation, We reserve the right to restrict the number of messages or emails which a user may send to other Users in any 24-hour period which We deem appropriate in our sole discretion. You understand that We have the right at all times to disclose any information (including the identity of the persons providing information or materials on the Website) as necessary to satisfy any law, regulation or valid governmental request. This may include, without limitation, disclosure of the information in connection with investigation of alleged illegal activity or solicitation of illegal activity or in response to a lawful court order or subpoena. We have no obligation to monitor the materials posted on the Website. We shall have the right to remove or edit any content that in its sole discretion violates, or is alleged to violate, any applicable law or either the spirit or letter of these Terms of Service. Notwithstanding this right, YOU REMAIN SOLELY RESPONSIBLE FOR THE CONTENT OF THE MATERIALS YOU POST ON THE WEBSITE AND IN YOUR PRIVATE MESSAGES. In no event shall We assume or have any responsibility or liability for any Content posted or for any claims, damages or losses resulting from the use of Content and/or appearance of Content on the Website. You hereby represent and warrant that You have all necessary rights in and to all Content which You provide and all information it contains and that such Content shall not infringe any proprietary or other rights of third parties or contain any libelous, tortuous, or otherwise unlawful information.',
        }, {
            question: "Copyright and Trademark",
            answer: 'The Company, its suppliers and licensors expressly reserve all intellectual property rights in all text, programs, products, processes, technology, images, content and other materials which appear on the Site. Access to or use of the Site does not confer and should not be considered as conferring upon anyone any license to the Company or any third party’s intellectual property rights. All rights, including copyright, in and to the Site are owned by or licensed to the Company. Any use of the Site or its contents, including copying or storing it or them in whole or part is prohibited without the permission of the Company. You may not modify, distribute or re-post anything on the Site for any purpose. The names and logos and all related product and service names, design marks and slogans are the trademarks/service marks of the Company, its affiliates, its partners or its suppliers/service providers. All other marks are the property of their respective owners. No trademark or service mark license is granted in connection with the materials contained on the Site. Access to or use of the Site does not authorize anyone to use any name, logo or mark in any manner. References on the Site to any names, marks, products or services of third parties or hypertext links to third party sites or information are provided solely as a convenience to you and do not in any way constitute or imply the Company’s endorsement, sponsorship or recommendation of the third party, the information, its product or services. The Company is not responsible for the content of any third party sites and does not make any representations regarding the content or accuracy of material on such sites. If you decide to access a link of any third party websites, you do so entirely at your own risk and expense.',
        }, {
            question: "Disclaimer of Warranties and Liabilities",
            answer: 'You expressly understand and agree that, to the maximum extent permitted by applicable law: The website, services and other materials are provided by this website is on an "as is" basis without warranty of any kind, express, implied, statutory or otherwise, including the implied warranties of title, non-infringement, merchantability or fitness for a particular purpose. Without limiting the foregoing, Novowash makes no warranty that Your requirements will be met or that services provided will be uninterrupted, timely, secure or error-free; Materials, information and results obtained will be effective, accurate or reliable; Any errors or defects in the website, services or other materials will be corrected. To the maximum extent permitted by applicable law, we will have no liability related to user content arising under intellectual property rights, libel, privacy, publicity, obscenity or other laws. Novowash also disclaims all liability with respect to the misuse, loss, modification or unavailability of any user content. The user understands and agrees that any material or data downloaded or otherwise obtained through the website is done entirely at his/her own discretion and risk and he/she will be solely responsible for any damage to his/her computer systems or loss of data that results from the download of such material or data. We are not responsible for any typographical error leading to an invalid coupon. Novowash accepts no liability for any errors or omissions, with respect to any information provided to you whether on behalf of itself or third parties. We shall not be liable for any third party product or services. The advertisement available on e-mail or website with respect to the third party website or the products and services are for information purpose only.',
        }, {
            question: "Indemnification and Limitation of Liability",
            answer: 'You agree to indemnify, defend and hold harmless this website/company including but not limited to its affiliate vendors, agents and employees from and against any and all losses, liabilities, claims, damages, demands, costs and expenses (including legal fees and disbursements in connection therewith and interest chargeable thereon) asserted against or incurred by us that arise out of, result from, or may be payable by virtue of, any breach or non-performance of any representation, warranty, covenant or agreement made or obligation to be performed by you pursuant to these terms of service. Further, you agree to hold us harmless against any claims made by any third party due to, or arising out of, or in connection with, your use of the website, any claim that your material caused damage to a third party, your violation of the terms of service, or your violation of any rights of another, including any intellectual property rights. In no event shall Novowash, its officers, directors, employees, partners or suppliers be liable to you, the vendor or any third party for any special, incidental, indirect, consequential or punitive damages whatsoever, including those resulting from loss of use, data or profits, whether or not foreseeable or whether or not we have been advised of the possibility of such damages, or based on any theory of liability, including breach of contract or warranty, negligence or other tortious action, or any other claim arising out of or in connection with your use of or access to the website, services or materials. The limitations and exclusions in this section apply to the maximum extent permitted by applicable law.',
        }, {
            question: "Termination",
            answer: 'This User Agreement is effective unless and until terminated by either you or the Company. You may terminate this User Agreement at any time, provided that you discontinue any further use of the Website. The Company may terminate this User Agreement at any time and may do so immediately without notice, and accordingly deny you access to the Site. Such termination will be without any liability to the Company. The Company’s right to any Comments and to be indemnified pursuant to the terms hereof, shall survive any termination of this User Agreement. Any such termination of the User Agreement shall not cancel your obligation to pay for product(s) already ordered from the Site or affect any liability that may have arisen under the User Agreement prior to the date of termination.',
        }, {
            question: "Hosting of Third Party Information",
            answer: 'The website hosts information provided by third parties. We are in no manner responsible to you for the accuracy, legitimacy and trueness of the information so hosted. We take reasonable care to ensure such accuracy but we are not responsible for the information so furnished. You agree to not hold us liable for the falsification of any such provided information.',
        }, {
            question: "Disputes and Jurisdiction",
            answer: 'All disputes involving but not limited to rights conferred, compensation, refunds, and other claims will be resolved through a two-step Alternate Dispute Resolution mechanism. Stage 1: Mediation. In case of a dispute, the matter will first be attempted to be resolved by a sole mediator who is a neutral third party and will be selected at the mutual acceptance of a proposed mediator by both parties. Both parties may raise a name for the sole mediator and in the case both parties accept the proposed name, the said person shall be appointed as sole mediator. In case the parties are not able to reach a consensus within two proposed mediators, the Company reserves the right to decide who the final mediator is. The decision of the mediator is not binding on both parties. b. Stage 2: Arbitration. In case that mediation does not yield a result suitable or preferred by any one of the parties, arbitration may follow, the award of which is binding on both parties. The Arbitration Board shall comprise three members – one appointed by each party and the third member to be nominated by the two appointed members by mutual consent. Arbitration shall be held at ________________, India. The proceedings of arbitration shall be in the English language. The arbitrator’s award shall be final and binding on the Parties.If the dispute cannot be resolved by this two-step Alternate Dispute Resolution mechanism, it shall be referred to the courts at ________. If the dispute cannot be resolved by this two-step Alternate Dispute Resolution mechanism, it shall be referred to the courts at Mumbai.',
        }, {
            question: "Privacy",
            answer: 'We encourage you to read the Privacy Policy and to use the information it contains to make informed decisions regarding Your personal information. Please also note that certain information, statements, data and content (such as but not limited to photographs) which You provide on the Website are likely to reveal Your gender, ethnic origin, nationality, age, and/or other personal information about You. You acknowledge and agree that your submission of such information is voluntary on Your part. Further, You acknowledge, consent and agree that we may access, preserve, and disclose information You provide to Us at any stage during Your use of the Website. Disclosures of information to Third Parties are further addressed in Our Privacy Policy.',
        }, {
            question: "Miscellaneous Provisions",
            answer: 'Entire Agreement: The terms and conditions set forth in this Section 3 and any additional or different terms expressly agreed by Client and Service vendor shall constitute the entire agreement and understanding of Client and Service vendor with respect to each Service Contract and shall cancel and supersede any other prior or contemporaneous discussions, agreements, representations, warranties, and/or other communications between them. Notwithstanding the foregoing, the Client and Service vendor shall always remain subject to the terms of the user Agreement. Waiver: The failure of either party at any time to require performance of any provision of this Agreement in no manner shall affect such party\'s right at a later time to enforce the same. No waiver by either party of any breach of this Agreement, whether by conduct or otherwise, in any one or more instances, shall be deemed to be, or construed as, a further or continuing waiver of any other such breach, or a waiver of any other breach of this Agreement. Severability: If any provision of this Agreement shall to any extent be held invalid, illegal or unenforceable, the validity, legality and enforceability of the remaining provisions of this Agreement shall in no way be affected or impaired thereby and each such provision of this Agreement shall be valid and enforceable to the fullest extent permitted by law. In such a case, this Agreement shall be reformed to the minimum extent necessary to correct any invalidity, illegality or unenforceability, while preserving to the maximum extent the rights and commercial expectations of the parties hereto, as expressed herein.',
        }, {
            question: "Contact Us",
            answer: 'If you have any questions about this Agreement, the practices of Novowash, or your experience with the Service, you can e-mail us at support@novowash.com.',
        }];
    }

    public ngOnDestroy() {}
}