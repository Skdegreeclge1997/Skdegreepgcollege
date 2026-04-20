import Image from 'next/image';

export const metadata = {
  title: 'About Us | S.K. Degree & P.G. College',
  description: 'Detailed information about S.K. Degree & P.G. College, its campus, infrastructure, and academic excellence.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20 relative">
      {/* Transparent Logo Watermark Background */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-0 opacity-[0.08]">
        <Image 
          src="/images/logo.jpeg" 
          alt="Watermark" 
          width={1000}
          height={1000}
          className="w-full max-w-4xl object-contain" 
          priority
        />
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* 1. Overview Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-academic-navy mb-4 border-b-2 border-academic-gold pb-2 inline-block">S.K. Degree & P.G. College</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            The College is situated in a serene and eco-friendly environment at Vizianagaram, Andhra Pradesh. 
            The campus is thoughtfully designed with greenery to provide a peaceful atmosphere for learning. 
            The College is conveniently located and well-connected to the main city and the railway station, 
            ensuring easy accessibility for students from various parts of the district.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            Our institution features modern academic buildings with dedicated spaces for various departments, 
            laboratories, and administrative offices. We provide comprehensive facilities for both boys and 
            girls, ensuring a safe and comfortable environment for all our students.
          </p>
        </section>

        {/* 2. History & Affiliation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-academic-navy mb-4 border-b-2 border-academic-gold pb-2 inline-block">Our Legacy</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            The dreams of our founding fathers took shape in 1995 with the establishment of S.K. Degree & P.G. College. 
            Operating under the aegis of the Arunodaya Educational Society, the college has grown into a premier 
            institution in the region. We are permanently affiliated to the respective University and operate 
            with all necessary government approvals and recognitions.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            S.K. College offers various undergraduate and postgraduate courses in Science, Commerce, and Management. 
            Our campus features state-of-the-art laboratories, a well-stocked library, and some of the best 
            computing facilities in the district. With an ideal teacher-student ratio, we strive for academic 
            excellence through personalized attention and innovative teaching methodologies.
          </p>
        </section>

        {/* 3. Infrastructure Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-academic-navy mb-6 border-b-2 border-academic-gold pb-2 inline-block">Campus Infrastructure</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-slate-200 px-4 py-3 text-left font-bold text-academic-navy">S.No</th>
                  <th className="border border-slate-200 px-4 py-3 text-left font-bold text-academic-navy">Building Name</th>
                  <th className="border border-slate-200 px-4 py-3 text-left font-bold text-academic-navy">Department / Office Accommodated</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">1</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700 font-medium">Main Academic Block</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Administrative Office, Admission Cell, Principal&apos;s Office</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">2</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700 font-medium">Science Block</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Physics, Chemistry, Botany, and Zoology Labs</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">3</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700 font-medium">Commerce & Arts Wing</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">Commerce, Arts, and Management Classrooms</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">4</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700 font-medium">Computer Lab Block</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-700">IT & Computer Science Laboratories, Digital Library</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Special Highlights */}
        <section className="mb-12 bg-slate-50 p-8 rounded-lg border-l-4 border-academic-gold">
          <h2 className="text-2xl font-bold text-academic-navy mb-6">What&apos;s Special About S.K. College</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 list-disc pl-5">
            <li className="text-slate-700 font-medium text-sm">Eco-friendly Green Campus</li>
            <li className="text-slate-700 font-medium text-sm">State-of-the-art Science Laboratories</li>
            <li className="text-slate-700 font-medium text-sm">Modern Computing Facilities</li>
            <li className="text-slate-700 font-medium text-sm">Well-stocked Central Library</li>
            <li className="text-slate-700 font-medium text-sm">Record Placement Track Record</li>
            <li className="text-slate-700 font-medium text-sm">Experienced & Trained Faculty</li>
            <li className="text-slate-700 font-medium text-sm">Campus Placement Training</li>
            <li className="text-slate-700 font-medium text-sm">Active NCC & NSS Units</li>
            <li className="text-slate-700 font-medium text-sm">Project & Activity Clubs</li>
            <li className="text-slate-700 font-medium text-sm">Hygienic Canteen Facilities</li>
            <li className="text-slate-700 font-medium text-sm">Transportation Facility Available</li>
            <li className="text-slate-700 font-medium text-sm">Regular Career Guidance Seminars</li>
          </ul>
        </section>

        {/* 5. Accreditations */}
        <section>
          <h2 className="text-2xl font-bold text-academic-navy mb-4 border-b-2 border-academic-gold pb-2 inline-block">Approvals & Recognitions</h2>
          <p className="text-slate-700 leading-relaxed">
            The college is approved by the Government of Andhra Pradesh and is permanently affiliated to the University. 
            We are proud to maintain high academic standards, consistently striving for excellence in education and holistic 
            student development. Our institution is recognized for its contribution to the educational landscape of Vizianagaram.
          </p>
        </section>

      </div>
    </main>
  );
}
