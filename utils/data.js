// import bcrypt from "bcryptjs";
import p1 from "../assets/images/p1.jpg";
import p2 from "../assets/images/p2.jpg";
import p3 from "../assets/images/p3.jpg";
import p4 from "../assets/images/p4.jpg";
import p5 from "../assets/images/p5.jpg";
import p6 from "../assets/images/p6.jpg";
import p7 from "../assets/images/p7.jpg";
import p8 from "../assets/images/p8.jpg";
import p9 from "../assets/images/p9.jpg";
import p10 from "../assets/images/p10.jpg";
import p11 from "../assets/images/p11.jpg";
import p12 from "../assets/images/p12.jpg";
import p13 from "../assets/images/p13.jpg";
import p14 from "../assets/images/p14.jpg";
import p15 from "../assets/images/p15.jpg";



const data = {
    // users: [
    //     {
    //         name: "Amir",
    //         email: "amiradmin@example.com",
    //         password: bcrypt.hashSync("123456", 8),
    //         isAdmin: true,
    //         isSeller: true,
    //     },
    //     {
    //         name: "Tems",
    //         email: "customer@example.com",
    //         password: bcrypt.hashSync("4321", 8),
    //         isAdmin: false,
    //         isSeller: false,
    //     },
    // ],

    products: [
        {
            id: 1,
            name: "Asus ZenBook Pro Duo",
            category: "Electronics",
            image: p1,
            price: 899.49,
            countInStock: 15,
            brand: "Asus",
            rating: 4.5,
            numReviews: 7,
            description:
                "Asus ZenBook Pro Duo UX581 15.6inch 4K UHD NanoEdge Bezel Touch, Intel Core i9-9980HK, 32GB RAM, 1TB PCIe SSD, GeForce RTX 2060",
        },
        {
            id: 2,
            name: "ASUS UX534FTC",
            category: "Electronics",
            image: p2,
            price: 1299.09,
            countInStock: 13,
            brand: "Asus",
            rating: 5,
            numReviews: 8,
            description:
                "ASUS UX534FTC-AS77 ZenBook 15 Laptop, 15.6” UHD 4K NanoEdge Display, Intel Core i7-10510U, GeForce GTX 1650, 16GB, 512GB PCIe SSD, ScreenPad 2.0, Amazon Alexa Compatible, Windows 10, Icicle Silver",
        },
        {
            id: 3,
            name: "ASUS ROG Strix Scar 15 (2020) Gaming Laptop",
            category: "Electronics",
            image: p3,
            price: 799.59,
            countInStock: 23,
            brand: "Asus",
            rating: 4,
            numReviews: 10,
            description:
                "ASUS ROG Strix Scar 15 (2020) Gaming Laptop, 15.6” 240Hz IPS Type FHD, NVIDIA GeForce RTX 2070 Super, Intel Core i7-10875H, 16GB DDR4, 1TB PCIe NVMe SSD, Per-Key RGB KB, Windows 10, G532LWS-DS76",
        },
        {
            id: 4,
            name: "Acer Predator Helios",
            category: "Electronics",
            image: p4,
            price: 1325.29,
            countInStock: 24,
            brand: "Acer",
            rating: 3.5,
            numReviews: 4,
            description:
                "Acer Predator Helios 300 Gaming Laptop, Intel i7-10750H, NVIDIA GeForce RTX 2060 6GB",
        },
        {
            id: 5,
            name: "HP Pavilion Gaming",
            category: "Electronics",
            image: p5,
            price: 799.25,
            countInStock: 51,
            brand: "HP",
            rating: 5,
            numReviews: 4,
            description:
                "HP Pavilion Gaming 15-Inch Micro-EDGE Laptop, Intel Core i5-9300H Processor, NVIDIA GeForce GTX 1650 4GB",
        },
        {
            id: 6,
            name: "ASUS TUF Gaming 27inch 2K HDR Gaming Monitor",
            category: "Electronics",
            image: p6,
            price: 659.46,
            countInStock: 0,
            brand: "Asus",
            rating: 3.5,
            numReviews: 4,
            description:
                "ASUS TUF Gaming 27inch 2K HDR Gaming Monitor (VG27AQ) - WQHD (2560 x 1440), 165Hz (Supports 144Hz), 1ms, Extreme Low Motion Blur",
        },
        {
            id: 7,
            name: "Acer Nitro 5",
            category: "Electronics",
            image: p7,
            price: 875.05,
            countInStock: 0,
            brand: "Acer",
            rating: 4.5,
            numReviews: 4,
            description:
                "Acer Nitro 5 Gaming Laptop, 9th Gen Intel Core i5-9300H, NVIDIA GeForce GTX 1650, 15.6",
        },

        {
            id: 8,
            name: "GE Forcce RTX 2080",
            category: "Gaming",
            image: p8,
            price: 1249.05,
            countInStock: 0,
            brand: "Nvidia",
            rating: 4.5,
            numReviews: 4,
            description:
                "GeForce RTXTM graphics cards are powered by the Turing GPU architecture and the all-new RTX platform. This gives you up to 6X the performance of previous-generation graphics cards and brings the power of real-time ray tracing and AI to games",
        },

        {
            id: 9,
            name: "Razer FHD 144hz",
            category: "Gaming",
            image: p9,
            price: 1249.05,
            countInStock: 0,
            brand: "Nvidia",
            rating: 4.5,
            numReviews: 4,
            description:
                "Just when you thought a gaming laptop couldn’t be any more beastly—introducing the new Razer Blade 15, now available with the latest 12th Gen Intel® Core™ processor (14-core) and NVIDIA® GeForce RTX™ 30 Series Laptop GPUs for the most powerful gaming laptop graphics ever. With your choice of a Full HD 360Hz, QHD 240Hz (G-SYNC), or new UHD 144Hz display, enjoy unrivalled performance packed into the thinnest 15” RTX gaming laptop chassis ever.",
        },

        {
            id: 10,
            name: "Nike Polo Shirt",
            category: "Shirts",
            image: p10,
            price: 100,
            countInStock: 15,
            brand: "Nike",
            rating: 4.5,
            numReviews: 7,
            description: "Nike White Polo shirt",
        },
        {
            id: 11,
            name: "Under Armour Shirt",
            category: "Electronics",
            image: p11,
            price: 120,
            countInStock: 13,
            brand: "Under Armour",
            rating: 5,
            numReviews: 8,
            description: "Under Armour Polo",
        },
        {
            id: 12,
            name: "Adidas Stripe Shirt",
            category: "Shirts",
            image: p12,
            price: 140,
            countInStock: 23,
            brand: "Adidas",
            rating: 4,
            numReviews: 10,
            description: "Adidas Stripe Polo shirt",
        },
        {
            id: 13,
            name: "Nike Slack pants",
            category: "Pants",
            image: p13,
            price: 125,
            countInStock: 24,
            brand: "Nike",
            rating: 3.5,
            numReviews: 4,
            description: "Formal Slack Pants ",
        },
        {
            id: 14,
            name: "Under Armour Formal pants",
            category: "Pants",
            image: p14,
            price: 155,
            countInStock: 51,
            brand: "Under Armour",
            rating: 5,
            numReviews: 4,
            description: "Premium Slack Pants ",
        },
        // {
        //     name: "Adidas Premium Pants",
        //     category: "Pants",
        //     image: p15,
        //     price: 150,
        //     countInStock: 0,
        //     brand: "Under Armour",
        //     rating: 2.5,
        //     numReviews: 4,
        //     description: "Adidas Premium Slack Pants ",
        // },
    ],
};

export default data;
