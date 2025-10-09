<template>
  <div class="min-h-screen">
    <!-- Header -->
    <PublicHeader />
    
    <!-- Hero Section -->
    <section class="relative h-96 flex items-center justify-center" style="background-image: url('/uploads/pic1.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">About Us</h1>
        <p class="text-2xl text-white/90">Global Insight. Local Compassion</p>
        <p class="text-lg text-white/80">Care inspired by international standards, tailored for Zimbabwe.</p>
      </div>
    </section>

    <!-- Main Navigation Tabs -->
    <section class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4">
        <nav class="flex flex-wrap justify-center gap-6 py-6">
          <NuxtLink
            v-for="tab in mainTabs"
            :key="tab.id"
            :to="{ path: '/about', hash: `#${tab.id}` }"
            :class="[
              'px-1 py-2 text-lg font-medium transition-colors focus:outline-none',
              activeMainTab === tab.id
                ? 'text-lucerna-primary border-b-2 border-lucerna-primary'
                : 'text-gray-700 hover:text-lucerna-primary focus:text-lucerna-primary',
            ]"
          >
            <span class="inline-block pb-1">
              {{ tab.title }}
            </span>
          </NuxtLink>
        </nav>
      </div>
    </section>

    <!-- Content Sections -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <!-- Our Story -->
      <div v-if="activeMainTab === 'story'" id="story" class="space-y-16">
        <div class="text-center">
          <span class="inline-block text-lucerna-primary font-semibold tracking-wide uppercase bg-lucerna-background rounded-full px-3 py-1 mb-3">Rooted at Home. Strengthened by Diaspora</span>
          <h2 class="text-4xl font-bold text-gray-900 mb-2">Our Story</h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <img src="/uploads/about-us.jpg" alt="Our Story" class="w-full h-80 object-cover rounded-xl shadow" />
          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-8">
              Lucerna & Stern Health was founded by a committed group of Zimbabweans, some based right here at home, and others living and working abroad. What binds us together is a shared purpose: to bring high-quality, compassionate care to families across Zimbabwe, inspired by the best practices we've witnessed around the world.
            </p>

            <p class="text-lg text-gray-700 leading-relaxed mb-8">
              We've experienced first-hand the challenges of caring for loved ones in today's changing world. Many of us have parents, grandparents, and relatives who once relied on the strong, extended family networks that defined Zimbabwean life. But with mass migration, smaller households, and growing health needs, the traditional ways of caring are no longer always possible.
            </p>
          </div>
        </div>

        <!-- Additional Story (toggles under the image/text) -->
        <div class="mt-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <button @click="showStoryMore1 = !showStoryMore1" class="w-full flex items-center justify-between text-left font-semibold text-gray-900">
                <span>More about who we are</span>
                <Icon name="mdi:chevron-down" :class="['transition-transform', showStoryMore1 ? 'rotate-180' : '']" />
              </button>
              <div v-if="showStoryMore1" class="mt-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  At Lucerna & Stern Health, we are more than care providers. We are sons, daughters, nieces, and nephews who have walked this journey ourselves. We understand what it means to want the best for someone you love, even when you're far away. That's why we've created a service that feels close, personal, and deeply respectful.
                </p>
              </div>
            </div>

            <div class="bg-white rounded-xl border border-gray-200 p-6">
              <button @click="showStoryMore2 = !showStoryMore2" class="w-full flex items-center justify-between text-left font-semibold text-gray-900">
                <span>Our experience and standards</span>
                <Icon name="mdi:chevron-down" :class="['transition-transform', showStoryMore2 ? 'rotate-180' : '']" />
              </button>
              <div v-if="showStoryMore2" class="mt-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Educated and trained in Zimbabwe, the UK, and other global health systems, our founders bring decades of combined clinical experience, cultural awareness, and a commitment to quality. Some continue to serve in the NHS and other international care settings, ensuring we stay connected to the highest standards of professional care. But we don't just follow global practices; we adapt them to fit Zimbabwe's context with warmth, practicality, and dignity. Our care is proudly local, yet globally informed.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- The Changing Nature of Care in Zimbabwe -->
        <div class="bg-gray-50 rounded-xl p-8">
          <h3 class="text-3xl font-bold text-gray-900 mb-6">The Changing Nature of Care in Zimbabwe</h3>
          <p class="text-lg text-gray-700 mb-6">
            Traditionally, Zimbabwean families provided care within the home, supported by close-knit communities. But over time, this model has shifted:
          </p>
          <ul class="space-y-3 text-lg text-gray-700">
            <li class="flex items-start">
              <Icon name="mdi:check-circle" class="text-green-600 mt-1 mr-3 flex-shrink-0" />
              <span>Migration has separated families across continents.</span>
            </li>
            <li class="flex items-start">
              <Icon name="mdi:check-circle" class="text-green-600 mt-1 mr-3 flex-shrink-0" />
              <span>Long-distance caregiving has become the new norm.</span>
            </li>
            <li class="flex items-start">
              <Icon name="mdi:check-circle" class="text-green-600 mt-1 mr-3 flex-shrink-0" />
              <span>Health needs have grown more complex; conditions like stroke, dementia, and diabetes now require skilled care.</span>
            </li>
            <li class="flex items-start">
              <Icon name="mdi:check-circle" class="text-green-600 mt-1 mr-3 flex-shrink-0" />
              <span>Urbanisation has reshaped households, and smaller, busier families often lack the capacity to provide 24/7 care.</span>
            </li>
            <li class="flex items-start">
              <Icon name="mdi:check-circle" class="text-green-600 mt-1 mr-3 flex-shrink-0" />
              <span>Attitudes are changing—professional homecare is now recognised not as neglect, but as a responsible, loving choice.</span>
            </li>
          </ul>
          <p class="text-lg text-gray-700 mt-6">
            At Lucerna & Stern Health, we stand at the heart of this transformation. We help families care with confidence, whether they live in Harare or the Highlands of Scotland. Lucerna & Stern Health exists because we saw the gap and chose to bridge it with integrity, compassion, and hope. We are here to serve Zimbabwean families with the heart of the diaspora and the hands of home.
          </p>
        </div>
      </div>

      <!-- Our Team -->
      <div v-if="activeMainTab === 'team'" id="team" class="space-y-16 mt-16 md:mt-24 scroll-mt-24">
        <div class="text-center">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
        </div>

        <!-- Leadership Team -->
        <div class="space-y-10">
          <div class="text-center max-w-5xl mx-auto">
            <h3 class="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h3>
            <p class="text-lg text-gray-700">
              At the helm of our boutique domiciliary care agency is a dynamic leadership team united by a shared vision — to redefine compassionate care in Zimbabwe and beyond. With a deep understanding of local needs and an appreciation for the expectations of the Zimbabwean diaspora, our leaders bring together a wealth of experience, empathy, and innovation. Their combined expertise ensures that our services not only uphold the highest standards of professionalism and integrity but also provide the reassurance and dignity every family deserves — whether caring for loved ones at home or from afar.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <!-- Blessing Gwindi -->
            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
              <div class="mb-4">
                <h4 class="text-xl font-bold text-gray-900">Blessing Gwindi</h4>
                <p class="text-gray-600">Managing Director</p>
                <a href="mailto:blessing@lucernahealth.co.zw" class="text-blue-600 hover:text-blue-700 mt-2 inline-block">blessing@lucernahealth.co.zw</a>
              </div>
              <button @click="openProfile('blessing')" class="btn-primary self-start">View Profile</button>
            </div>

            <!-- Farirayi Nyawasha -->
            <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
              <div class="mb-4">
                <h4 class="text-xl font-bold text-gray-900">Farirayi Nyawasha</h4>
                <p class="text-gray-600">Operations Director</p>
                <span class="text-gray-600 mt-2 inline-block">Email: XXXX</span>
              </div>
              <button @click="openProfile('fari')" class="btn-primary self-start">View Profile</button>
            </div>
          </div>
          
          <!-- Profile Modal -->
          <div v-if="isProfileModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-black/50" @click="closeProfile"></div>
            <div class="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 md:p-8 overflow-y-auto max-h-[85vh]">
              <button @click="closeProfile" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" aria-label="Close">
                <Icon name="mdi:close" class="text-2xl" />
              </button>
              <div v-if="selectedProfile === 'blessing'" class="space-y-4 text-gray-700 leading-relaxed">
                <h4 class="text-2xl font-bold text-gray-900">Blessing Gwindi — Managing Director & Founder</h4>
                <p>
                  Blessing is the Managing Director and Founder of Lucerna & Stern Health. A Registered Children’s Nurse with a Diploma in Higher Education, she brings extensive clinical and leadership experience from her work within the UK’s National Health Service (NHS) and related organisations, including NHS 111 and the Care Quality Commission (CQC).
                </p>
                <p>
                  Throughout her career, Blessing has served in a variety of roles spanning School Nursing, Health Visiting, Safeguarding, and Learning Disability Services, as well as holding successive leadership positions across the NHS. Blessing also holds a Specialist BSc in Health Visiting from Brunel University. Her key strengths include health and social care regulation, safeguarding, service improvement, and organisational alignment with regulatory standards.
                </p>
                <p>
                  At Lucerna & Stern Health, Blessing combines her professional rigor with a compassionate vision — leading the agency to provide exceptional, person-centred domiciliary care for families in Zimbabwe and for members of the diaspora seeking trusted care for their loved ones back home.
                </p>
              </div>
              <div v-else-if="selectedProfile === 'fari'" class="space-y-4 text-gray-700 leading-relaxed">
                <h4 class="text-2xl font-bold text-gray-900">Farirayi Nyawasha — Operations Director</h4>
                <p>
                  As a Partner and Operations Director at Lucerna & Stern Health, Fari brings a steadfast commitment to compassionate, efficient, and high-quality care. With a strong clinical foundation as a Nurse Aide, she has developed extensive hands-on experience across both hospital and home-based care environments, providing expert support to patients with complex medical and rehabilitation needs, including stroke recovery.
                </p>
                <p>
                  Dedicated and results-oriented, Fari has demonstrated consistent leadership in coordinating home care routines, upholding rigorous infection control standards, and ensuring seamless collaboration among families, therapists, and nursing teams. Fari combines clinical competence with a calm and empathetic presence, ensuring that every client receives care that preserves dignity, promotes independence, and enhances overall well-being.
                </p>
                <p>
                  Before joining Lucerna & Stern Health, Fari worked at First Mutual Hospital in Southerton, Harare, and in private domiciliary settings, where she earned recognition for reliability, initiative, and excellence in patient care. Her proven ability to manage multiple priorities while maintaining safety, comfort, and trust has made her a valued leader in operational delivery and service improvement.
                </p>
                <p>
                  Fari holds a Nurse Aide Certificate, Advanced First Aid Certificate, and Community-Based Health Care Certificate from the Zimbabwe Red Cross Society, as well as a Diploma in Systemic Therapy from the Zimbabwe Institute of Systemic Therapy. These qualifications reflect her holistic approach to care, blending clinical skill with therapeutic understanding and community insight.
                </p>
                <p>
                  At Lucerna & Stern Health, Fari plays a pivotal role in ensuring the seamless coordination of services, operational excellence, and the consistent delivery of compassionate, client-centred care, both for the local population and the Zimbabwean diaspora entrusting the agency with the wellbeing of their loved ones back home.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Hiring Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div class="lg:order-1">
            <h3 class="text-3xl font-bold text-gray-900 mb-6">Hiring: We Hire Like It's Personal—Because It Is</h3>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              At Lucerna & Stern Health, every client is treated like family. That begins with the people we hire. We look for more than just qualifications; we seek out caregivers who show genuine empathy, patience, and integrity.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Would we trust them to care for our own parents or grandparents? If the answer isn't a resounding yes, we don't move forward.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Our recruitment process is thoughtful and thorough. Every nurse and aide is carefully selected not only for their clinical expertise but for their ability to deliver care with kindness, respect, and heart. Because when care feels personal, it makes all the difference.
            </p>
          </div>
          <div class="bg-white rounded-xl p-8 border border-gray-200">
            <h4 class="text-2xl font-bold text-gray-900 mb-6">Our Caregivers Set the Standard</h4>
            <p class="text-lg text-gray-700 mb-6">
              At Lucerna & Stern Health, we work with only the best—because your loved one deserves nothing less. Our home health aides, private nurses, and allied health professionals are:
            </p>
            <ul class="space-y-3 text-lg text-gray-700">
              <li class="flex items-start">
                <Icon name="mdi:check-circle" class="text-lucerna-primary mt-1 mr-3 flex-shrink-0" />
                <span>Among the top-tier of care professionals in their field</span>
              </li>
              <li class="flex items-start">
                <Icon name="mdi:check-circle" class="text-lucerna-primary mt-1 mr-3 flex-shrink-0" />
                <span>Carefully vetted with verified professional references</span>
              </li>
              <li class="flex items-start">
                <Icon name="mdi:check-circle" class="text-lucerna-primary mt-1 mr-3 flex-shrink-0" />
                <span>Fully screened, background-checked, and credentialed</span>
              </li>
              <li class="flex items-start">
                <Icon name="mdi:check-circle" class="text-lucerna-primary mt-1 mr-3 flex-shrink-0" />
                <span>Paid fair, competitive wages with access to ongoing support</span>
              </li>
              <li class="flex items-start">
                <Icon name="mdi:check-circle" class="text-lucerna-primary mt-1 mr-3 flex-shrink-0" />
                <span>Trained beyond the basics to deliver exceptional, person-centred care</span>
              </li>
            </ul>
            <p class="text-lg text-gray-700 mt-6">
              We take pride in building a team you can trust—people who are clinically skilled, emotionally present, and deeply committed to dignified care.
            </p>
          </div>
        </div>

        <!-- A Whole Team of Support -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 class="text-3xl font-bold text-gray-900 mb-6">A Whole Team of Support — Care You Can Count on, Wherever You Are</h3>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              At Lucerna & Stern Health, we believe that true peace of mind begins with knowing your loved one is receiving the same compassionate, attentive care you would provide yourself—no matter where you are in the world.
            </p>
            <button @click="showSupportMore = !showSupportMore" class="inline-flex items-center text-brand font-semibold mb-4 focus:outline-none">
              <span>{{ showSupportMore ? 'Show less' : 'Read more' }}</span>
              <Icon name="mdi:chevron-down" :class="['ml-2 transition-transform', showSupportMore ? 'rotate-180' : '']" />
            </button>
            <div v-if="showSupportMore">
              <p class="text-lg text-gray-700 leading-relaxed mb-6">
                We specialise in supporting families in the diaspora who carry the emotional weight of caring for aging parents or loved ones from afar. From the very first interaction, your journey begins with a consultation led by one of our experienced Registered Nurses. We take time to understand your loved one's current health, daily routines, and lifestyle preferences. Based on this, we craft a personalised plan of care and assemble a highly capable, multi-disciplinary team tailored to your family's specific goals.
              </p>
              <p class="text-lg text-gray-700 leading-relaxed mb-6">
                Our caregivers and nurses are handpicked for their experience, empathy, and professionalism. Whether your loved one requires occasional companionship or complex, 24-hour clinical oversight, we're equipped to deliver a consistent standard of excellence. We are available 24/7, providing updates, reassurance, and a direct line of communication to ensure you're always informed and included.
              </p>
              <p class="text-lg text-gray-700 leading-relaxed mb-8">
                Let us be your trusted hands on the ground—so your loved one can live with dignity and comfort, and you can rest easy, wherever you are.
              </p>
            </div>
            <button class="btn-primary text-lg px-8 py-4">
              Contact Us Today to begin the care journey with Lucerna & Stern Health.
            </button>
          </div>
          <div class="space-y-6">
            <img src="/uploads/pic4.png" alt="Team of Support" class="w-full h-80 object-cover rounded-xl shadow" />
          </div>
        </div>
      </div>

      <!-- Why Lucerna & Stern Health -->
      <div v-if="activeMainTab === 'why'" id="why" class="space-y-16">
        <div class="text-center">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Why Lucerna & Stern Health</h2>
        </div>

        <!-- Sub Navigation Tabs -->
        <div class="bg-white border-b border-gray-200">
          <nav class="flex flex-wrap justify-center gap-6 py-6">
            <button 
              v-for="tab in subTabs" 
              :key="tab.id"
              @click="activeSubTab = tab.id"
              :class="[
                'px-1 py-2 text-lg font-medium transition-colors focus:outline-none',
                activeSubTab === tab.id 
                  ? 'text-lucerna-primary border-b-2 border-lucerna-primary' 
                  : 'text-gray-700 hover:text-lucerna-primary focus:text-lucerna-primary'
              ]"
            >
              <span class="inline-block pb-1">{{ tab.title }}</span>
            </button>
          </nav>
        </div>

        <!-- Sub Tab Content -->
        <div class="space-y-12">
          <!-- Our Mission -->
          <div v-if="activeSubTab === 'mission'" class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img src="/uploads/pic2.png" alt="Our Mission" class="w-full h-72 object-cover rounded-xl shadow" />
            <div class="text-center lg:text-left">
              <h3 class="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p class="text-xl text-gray-700 leading-relaxed">
              At Lucerna & Stern Health, our mission is to deliver exceptional, dignified care in the comfort of home, guided by compassion, respect, and clinical excellence. We are committed to supporting every client and their loved ones with unwavering integrity, confidentiality, and cultural understanding.
              </p>
            </div>
          </div>

          <!-- Our Purpose -->
          <div v-if="activeSubTab === 'purpose'" class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img src="/uploads/pic5.png" alt="Our Purpose" class="w-full h-72 object-cover rounded-xl shadow lg:order-2" />
            <div class="text-center lg:text-left lg:order-1">
              <h3 class="text-3xl font-bold text-gray-900 mb-6">Our Purpose</h3>
              <p class="text-xl text-gray-700 leading-relaxed">
              At Lucerna & Stern Health, our purpose is to bridge the gap between medical need and compassionate living, empowering individuals to heal, thrive, and age with dignity in the place they know best: home. We exist to give families peace of mind by delivering personalised care that respects cultural values and meets the highest standards of support.
              </p>
            </div>
          </div>

          <!-- Our Vision -->
          <div v-if="activeSubTab === 'vision'" class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img src="/uploads/pic6.png" alt="Our Vision" class="w-full h-72 object-cover rounded-xl shadow" />
            <div class="text-center lg:text-left">
              <h3 class="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
              <p class="text-xl text-gray-700 leading-relaxed">
              To transform the landscape of home-based care in Zimbabwe by setting the benchmark for excellence, compassion, and culturally rooted support. We aim to ensure that every Zimbabwean has access to dignified, professional care within the comfort of their own home.
              </p>
            </div>
          </div>

          <!-- Our Values -->
          <div v-if="activeSubTab === 'values'" class="space-y-8">
            <h3 class="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="bg-white rounded-xl p-6 shadow-lg text-center">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="mdi:account-heart" class="text-3xl text-blue-600" />
                </div>
                <h4 class="text-xl font-bold text-gray-900 mb-3">Dignity</h4>
                <p class="text-gray-600">We treat every client with respect and humanity, honouring their life stories, choices, and rights.</p>
              </div>

              <div class="bg-white rounded-xl p-6 shadow-lg text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="mdi:star" class="text-3xl text-green-600" />
                </div>
                <h4 class="text-xl font-bold text-gray-900 mb-3">Excellence</h4>
                <p class="text-gray-600">We hold ourselves to the highest standards in care delivery, staff training, and professional integrity. We don't settle; we elevate.</p>
              </div>

              <div class="bg-white rounded-xl p-6 shadow-lg text-center">
                <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="mdi:handshake" class="text-3xl text-purple-600" />
                </div>
                <h4 class="text-xl font-bold text-gray-900 mb-3">Trust</h4>
                <p class="text-gray-600">Our service is built on reliability, honesty, and transparency. Families in the diaspora place their trust in us, and we honour that trust every day.</p>
              </div>

              <div class="bg-white rounded-xl p-6 shadow-lg text-center">
                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="mdi:heart" class="text-3xl text-red-600" />
                </div>
                <h4 class="text-xl font-bold text-gray-900 mb-3">Compassion</h4>
                <p class="text-gray-600">More than procedures, care is about people. We listen, understand, and walk alongside every client and their family.</p>
              </div>

              <div class="bg-white rounded-xl p-6 shadow-lg text-center">
                <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="mdi:earth" class="text-3xl text-orange-600" />
                </div>
                <h4 class="text-xl font-bold text-gray-900 mb-3">Cultural Sensitivity</h4>
                <p class="text-gray-600">We deliver care that respects Zimbabwean traditions while reflecting international best practices—always tailored, never one-size-fits-all.</p>
              </div>

              <div class="bg-white rounded-xl p-6 shadow-lg text-center">
                <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="mdi:shield-check" class="text-3xl text-indigo-600" />
                </div>
                <h4 class="text-xl font-bold text-gray-900 mb-3">Accountability</h4>
                <p class="text-gray-600">We are responsible to our clients, our staff, and the families who entrust us with their care. We act with professionalism, responsiveness, and clarity.</p>
              </div>
            </div>
            <p class="text-center text-lg text-gray-700 mt-8">
              At Lucerna & Stern Health, these values are not slogans; they are our compass.
            </p>
          </div>

          <!-- Our Approach to Care -->
          <div v-if="activeSubTab === 'approach'" class="space-y-8">
            <div class="text-center">
              <h3 class="text-3xl font-bold text-gray-900 mb-4">Our Approach to Care</h3>
              <p class="text-xl text-gray-600 mb-8">"Care You Can Trust, by People Who Understand Your World."</p>
            </div>
            <p class="text-lg text-gray-700 leading-relaxed mb-8">
              At Lucerna & Stern Health, our approach to care is deeply human, rigorously professional, and culturally intelligent.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:earth" class="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <h4 class="text-lg font-bold text-gray-900 mb-2">Diaspora-Informed, Locally Delivered</h4>
                    <p class="text-gray-600">We understand the expectations of the diaspora because we are part of it. We bridge worlds to bring dignity home.</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:account-heart" class="text-2xl text-green-600" />
                  </div>
                  <div>
                    <h4 class="text-lg font-bold text-gray-900 mb-2">Person-Centred and Relationship-Led</h4>
                    <p class="text-gray-600">Every care plan starts with the individual. Our carers are not task-doers; they are relationship-builders.</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:star" class="text-2xl text-purple-600" />
                  </div>
                  <div>
                    <h4 class="text-lg font-bold text-gray-900 mb-2">Evidence-Based and Standards-Driven</h4>
                    <p class="text-gray-600">We follow global best practices, adapted for Zimbabwe's context. Quality is never optional.</p>
                  </div>
                </div>
              </div>

              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:message" class="text-2xl text-orange-600" />
                  </div>
                  <div>
                    <h4 class="text-lg font-bold text-gray-900 mb-2">Integrated Communication with Diaspora Families</h4>
                    <p class="text-gray-600">Families abroad are not just observers; they are care partners. We provide real-time updates and active dialogue.</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:school" class="text-2xl text-red-600" />
                  </div>
                  <div>
                    <h4 class="text-lg font-bold text-gray-900 mb-2">Training that Transforms</h4>
                    <p class="text-gray-600">We are an accredited provider of Nursing Aide training, raising the standard of care and empowering local talent.</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:home-heart" class="text-2xl text-indigo-600" />
                  </div>
                  <div>
                    <h4 class="text-lg font-bold text-gray-900 mb-2">Respect for Culture, Legacy and Home</h4>
                    <p class="text-gray-600">Our care honours the rhythms of Zimbabwean life. We recognise that care is not just about health, but about legacy and belonging.</p>
                  </div>
                </div>
              </div>
            </div>
            <p class="text-center text-lg text-gray-700 mt-8">
              Lucerna & Stern Health is not a service. It is a promise to care with excellence, to act with integrity, and to serve with the heart of home.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <PublicFooter />
  </div>
</template>

<script setup>
// Main navigation tabs
const route = useRoute()
const hash = computed(() => (route.hash || '').replace('#', ''))
const validMain = ['story', 'team', 'why']
const activeMainTab = computed(() => validMain.includes(hash.value) ? hash.value : 'story')
const mainTabs = ref([
  { id: 'story', title: 'Our Story' },
  { id: 'team', title: 'Our Team' },
  { id: 'why', title: 'Why Lucerna & Stern Health' }
])

// Sub navigation tabs for "Why Lucerna & Stern Health"
const activeSubTab = ref('mission')
const subTabs = ref([
  { id: 'mission', title: 'Our Mission' },
  { id: 'purpose', title: 'Our Purpose' },
  { id: 'vision', title: 'Our Vision' },
  { id: 'values', title: 'Our Values' },
  { id: 'approach', title: 'Our Approach To Care' }
])

// Toggle for A Whole Team of Support extra paragraphs
const showSupportMore = ref(false)

// Toggles for additional story paragraphs
const showStoryMore1 = ref(false)
const showStoryMore2 = ref(false)

// Profile modal state
const isProfileModalOpen = ref(false)
const selectedProfile = ref(null)

const openProfile = (profile) => {
  selectedProfile.value = profile
  isProfileModalOpen.value = true
}

const closeProfile = () => {
  isProfileModalOpen.value = false
  selectedProfile.value = null
}
</script> 