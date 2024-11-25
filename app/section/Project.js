import React from "react";
import ProjectCard from "../components/ProjectCard";
import Masonry from "react-responsive-masonry";


export default function Project() {
    console.log(projectData);

    return (
        <div className="bg-secondary-content py-8 flex justify-center p-2 lg:p-4 xl:p-6">
            <div className=" py-2 lg:py-4 xl:py-6">
                <h3 className="text-2xl font-semibold mb-2">Technical</h3>
                <p className="max-w-[30ch]">
                    You can find me actively working with technologies like React,
                    Node.js, Express, MongoDB, <wbr />
                    and Tailwind CSS. <wbr />I also enjoy exploring Rust, <wbr />
                    and I am capable of working with Python,
                    <wbr /> C++,
                    <wbr /> and Java when needed.
                </p>
            </div>

            <div className="mx-auto max-w-[50vw] w-full">
                <Masonry columnsCount={3} gutter="10px">
                    {projectData.map((project) => (
                        <ProjectCard
                            title={project.title}
                            date={project.date}
                            location={project.location}
                            links={project.links}
                            technologies={project.technologies}
                            key={project.title}
                        />
                    ))}
                </Masonry>
            </div>
        </div>
    );
}
const projectData = [
    {
        title: "Test-Driven Development with Node.JS",
        date: "25th Jan 2024",
        location: "Online",
        links: [
            { name: "Check Demo", url: "https://github.com/project1/demo" },
            { name: "Check Out", url: "https://github.com/project1" },
        ],
        technologies: ["Node.js", "Jest", "Express"],
    },
    {
        title: "Frontend Development with React",
        date: "15th Feb 2024",
        location: "Remote",
        links: [
            { name: "Live Preview", url: "https://github.com/project2/preview" },
            { name: "Documentation", url: "https://github.com/project2/docs" },
        ],
        technologies: ["React", "Redux", "Tailwind CSS"],
    },
    {
        title: "E-commerce Website with Next.js",
        date: "5th Mar 2024",
        location: "Online",
        links: [
            { name: "Demo", url: "https://github.com/project3/demo" },
            { name: "Purchase", url: "https://github.com/project3/purchase" },
            { name: "API Docs", url: "https://github.com/project3/api" },
        ],
        technologies: ["Next.js", "GraphQL", "Tailwind CSS"],
    },
    {
        title: "Machine Learning with Python",
        date: "20th Apr 2024",
        location: "In-person",
        links: [
            { name: "Watch Demo", url: "https://github.com/project4/demo" },
            { name: "Buy the Course", url: "https://github.com/project4/buy" },
        ],
        technologies: ["Python", "TensorFlow", "Pandas"],
    },
    {
        title: "Test-Driven Development with Node.JS",
        date: "25th Jan 2024",
        location: "Online",
        links: [
            { name: "Check Demo", url: "https://github.com/project1/demo" },
            { name: "Buy Link", url: "https://github.com/project1/buy" },
        ],
        technologies: ["Node.js", "Jest", "Express"],
    },
    {
        title: "Frontend Development with React",
        date: "15th Feb 2024",
        location: "Remote",
        links: [
            { name: "Source Code", url: "https://github.com/project2" },
            { name: "Documentation", url: "https://github.com/project2/docs" },
        ],
        technologies: ["React", "Redux", "Tailwind CSS"],
    },
    // {
    //     title: "E-commerce Website with Next.js",
    //     date: "5th Mar 2024",
    //     location: "Online",
    //     links: [
    //         { name: "Product Demo", url: "https://github.com/project3/demo" },
    //         { name: "API Docs", url: "https://github.com/project3/api" },
    //     ],
    //     technologies: ["Next.js", "GraphQL", "Tailwind CSS"],
    // },
    // {
    //     title: "Machine Learning with Python",
    //     date: "20th Apr 2024",
    //     location: "In-person",
    //     links: [
    //         { name: "Watch Demo", url: "https://github.com/project4/demo" },
    //         { name: "Buy the Course", url: "https://github.com/project4/buy" },
    //     ],
    //     technologies: ["Python", "TensorFlow", "Pandas"],
    // },
];
