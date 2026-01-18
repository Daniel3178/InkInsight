import { FaGithub } from "react-icons/fa";
import { MdEmail, MdSchool } from "react-icons/md";
import SohaNaeini from "../../assets/sohaNaeini.png";
import ermia from "../../assets/ermia.png";
import Merna from "../../assets/merna.jpg";
import p1 from "../../assets/P1.png";

const AboutUsView = () => {
  const teamMembers = [
    {
      name: "Soha Naeini",
      major: "Computer Science",
      github: "https://gits-15.sys.kth.se/naeini",
      email: "sohanaeini@gmail.com",
      image: SohaNaeini,
    },
    {
      name: "Ermia Ghaffari",
      major: "Information Technology",
      github: "https://github.com/ermia1230",
      email: "ermia@kth.se",
      image: ermia,
    },
    {
      name: "Merna Iskander",
      major: "Mechanical Engineering", // Fixed typo from original
      github: "https://gits-15.sys.kth.se/mnais",
      email: "mernaIskander35@gmail.com",
      image: Merna,
    },
    {
      name: "Daniel Ibrahimi",
      major: "Information Technology",
      github: "https://github.com/daniel3178",
      email: "danielib@kth.se",
      image: p1,
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-text-main py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4 tracking-tight">
            Meet the Team
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            The developers and storytellers behind InkInsight.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-surface border border-surface-highlight rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }} // Staggered animation effect
            >
              {/* Image Container */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="relative w-32 h-32 object-cover rounded-full border-4 border-surface shadow-md"
                />
              </div>

              {/* Text Content */}
              <h2 className="text-xl font-bold text-text-main mb-1">
                {member.name}
              </h2>

              <div className="flex items-center gap-2 text-sm text-brand-light mb-6 font-medium bg-brand-primary/10 px-3 py-1 rounded-full">
                <MdSchool />
                <span>{member.major}</span>
              </div>

              {/* Social Actions */}
              <div className="mt-auto flex gap-4 w-full justify-center border-t border-surface-highlight pt-6">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-white hover:bg-black/40 p-3 rounded-full transition-all duration-200"
                  title="View GitHub Profile"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="text-text-muted hover:text-white hover:bg-brand-primary/80 p-3 rounded-full transition-all duration-200"
                  title={`Email: ${member.email}`}
                >
                  <MdEmail size={24} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { AboutUsView };
