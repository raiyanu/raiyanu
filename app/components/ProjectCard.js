export default function ProjectCard({
    title,
    date,
    location,
    links,
    technologies,
}) {
    return (
        <article className="border-2 p-4 gap-6 w-full h-[300px] flex justify-between flex-col">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-primary-content ">
                <span className="block text-md sm:text-lg md:text-xl lg:text-2xl xl:text-2xl">
                    <span className="text-gray-400 text-xs block">
                        {" "}
                        {date} | {location}{" "}
                    </span>
                </span>
                {technologies.map((tech) => (
                    <span key={tech} className="text-xs md:text-sm lg:text-md mr-2">
                        {tech}
                    </span>
                ))}

                {/* <p className="text-sm sm:text-base md:text-md lg:text-lg xl:text-xl"></p> */}
            </p>
            <h3 className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl text-white">
                {title}
            </h3>
            <div className="gap-4 text-sm flex justify-center">
                {links.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        className="text-xs sm:text-xs lg:text-sm xl:text-sm text-primary-content"
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        </article>
    );
}
