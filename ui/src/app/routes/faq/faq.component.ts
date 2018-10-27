import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "faq",
    styleUrls: ["./faq.component.scss"],
    templateUrl: "./faq.component.html",
})

export class FAQComponent implements OnInit, OnDestroy {
    public faqs: any[];

    constructor(
        private router: Router,
    ) {}

    public ngOnInit() {
        this.faqs = [{
            question: "How is home deep cleaning different from traditional method of cleaning?",
            answer: "Traditional methods of cleaning involves primarily dusting/mopping of rooms, kitchens and balconies. 'Deep cleaning' of homes is a 5-6 hour meticulous task using state-of-the-art technology enabled equipments and with highly trained and professioanl service executives. It involves detailing every corner of your house, using steam technology equipments in hard to reach areas and advanced sanitizing solutions. It also involves basic vacuuming of home furniture like sofas,carpets as well as cleaning of glass, walls and detailing of bathrooms. In short, our team makes sure your home looks absolutely spic and span!",
        }, {
            question: "How much time does it take for your team to deep clean homes?",
            answer: "The time taken to deep clean depends on the size of the home. But on an average our team takes anywhere between 3-7 hours to clean homes.",
        }, {
            question: "What is the size of the team that comes to deep clean homes?",
            answer: "A team of 3 service professionals would be present for home deep cleaning. Apart from them, our Operations Manager, would be in constant touch with the service team to keep a track on the progress and monitor the service.",
        }, {
            question: "How often is it recommended to get homes deep cleaned in a year?",
            answer: "This depends where your home is geographically located. In cities like Delhi NCR where there is tremendous pollution and large amount of dust, we recommend home deep cleaning atleast once every two months. In general it is advisable to deep clean homes atleast once every three/four months to maintain a clean and healthy environment at your home.",
        }, {
            question: "What are the things I need to do before my home gets deep cleaned?",
            answer: "The only thing that we ask our customers to do is to empty wadrobes, kitchen utensils and all other areas where they want our team to deep clean. Novowash, would also schedule a preliminary enquiry call to understand any particular requirement our customer has.",
        }, {
            question: "What exactly is steam cleaning technology and how does it affect the cleaning process?",
            answer: "Steam cleaning technologies deployed by Novowash are state-of-the-art technologies which deploy pressurize steam to not just clean but sanitize interiors. The temperature of the steam helps to get rid of fungal growth, moulds and bacteria from interiors and upholsterly. Home furniture like sofas, carpets, mattresses, chairs and ward-drobes are steam vacuumed to not just clean as well as extract out dust and moulds from them.",
        }, {
            question: "Why do I need sofa cleaning or carpet cleaning?",
            answer: "It is very often observed that Sofas and carpets attact huge amounts of dust and pollution in the air. Families who have pets, often complain about hair-fall from the pet's body on sofas and mattresses. By using our steam vacuuming technology we are able to not just clean but sanitize your home uphlostery. This ensures a healthy and clean environment in your home.",
        }, {
            question: "Can you elaborate what exaclty is a kitchen cleaning service?",
            answer: "Kitchen cleaning service involves cleaning and degreasing of walls and areas above the gas stove, chimneys, steam cleaning and scrubbing of tiles to get rid of food and oil stains, steam cleaning of sink and sink holes and scrubbing the entire kitchen floor to remove all kinds of stains and marks.",
        }, {
            question: "What are the aspects that your car interior cleaning service covers?",
            answer: "It is often observed that cars are cleaned on the outside regularly but the interiors get left out. Novowash's car interior cleaning service consists of detailing of cars right from the roof-tops, AC vents, car-boot, car carpet area, car seats/upholstery, gear area, steering wheel, windows, side-doors and car dashboard. We deploy steam technology for interior cleaning and provide a complementary service which consists of a water-less organic chemical wipe for your car exteriors.",
        }, {
            question: "What is advanced sanitization of homes and how is it useful?",
            answer: "Sanitization is a concept new to India and it covers killing 99.9% bacteria and virus from the interiors including H1N1, Ebola etc using state-of-the-art sanization equipments and specialized solutions. We recommend post-surgery patients and the ones suffering from chronic diseases to sanitize their homes. It goes one step above deep cleaning, and keeps your flat bacteria free for upto 60 days! We also offer this service in hospitals and clinics all over India.",
        }, {
            question: "What does your 'new home package' consist of?",
            answer: "Our new home package is specially designed for people moving into a new/rented apartment. It consists of end-to-end services to get your flat ready for moving in comprising of civil work, painting, electrical work, deep cleaning and pest control services.",
        }, {
            question: "How is Novowash's commerical cleaning service unique and different?",
            answer: "Novowash is in the process of deploying complete digitized service deliverance process to ensure technology controls operational processes and check-lists. Apart from this, we have a dedicated training center to train our service professionals in not just serivce SOPs but also to develop qualitative skills like communication, hygiene and mobile usage. We also have strategically partnered with state-of-the-art technology enabled equipment providers to ensure highly quality service and deploy a dedicated management team to monitor service deliverance.",
        }];
    }

    public ngOnDestroy() {}
}