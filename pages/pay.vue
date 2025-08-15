<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-blue-900 to-green-800 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 class="text-5xl font-bold mb-6">Welcome to the Lucerna & Stern Health Online Payment Portal</h1>
        <p class="text-xl text-blue-100 leading-relaxed">
          We are committed to making every aspect of your experience seamless, including how you manage your payments. 
          Through our secure partnership, you can settle your bill safely, conveniently, and at a time that suits you.
        </p>
        <p class="text-lg text-blue-200 mt-4">
          To begin, please select the region where care was provided. This ensures you're connected to the correct payment portal. 
          Thank you for choosing Lucerna & Stern Health.
        </p>
      </div>
    </section>

    <!-- Payment Selection -->
    <div class="max-w-2xl mx-auto px-4 py-16">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="mdi:credit-card" class="text-3xl text-green-600" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Select Your Region</h2>
          <p class="text-gray-600">Choose where care services were provided</p>
        </div>

        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Zimbabwean Regions</label>
            <select 
              v-model="selectedRegion"
              @change="handleRegionSelection"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            >
              <option value="">Select a region</option>
              <option value="harare">Harare</option>
              <option value="bulawayo">Bulawayo</option>
              <option value="gweru">Gweru</option>
              <option value="mutare">Mutare</option>
              <option value="masvingo">Masvingo</option>
              <option value="victoria-falls">Victoria Falls</option>
              <option value="chinhoyi">Chinhoyi</option>
              <option value="bindura">Bindura</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div v-if="selectedRegion" class="bg-blue-50 rounded-lg p-4">
            <div class="flex items-center space-x-3">
              <Icon name="mdi:information" class="text-blue-600 text-xl" />
              <div>
                <p class="font-medium text-blue-900">Redirecting to Payment Gateway</p>
                <p class="text-sm text-blue-700">You will be redirected to our secure payment portal for {{ getRegionName(selectedRegion) }}.</p>
              </div>
            </div>
          </div>

          <button 
            @click="proceedToPayment"
            :disabled="!selectedRegion"
            :class="[
              'w-full py-4 px-6 rounded-lg font-medium text-lg transition-colors',
              selectedRegion 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            <Icon name="mdi:lock" class="mr-2" />
            Proceed to Secure Payment
          </button>
        </div>

        <!-- Security Notice -->
        <div class="mt-8 pt-6 border-t border-gray-200">
          <div class="flex items-start space-x-3">
            <Icon name="mdi:shield-check" class="text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 class="font-medium text-gray-900 mb-1">Secure Payment Processing</h3>
              <p class="text-sm text-gray-600">
                All payments are processed through secure, encrypted payment gateways. 
                Your financial information is protected with industry-standard security measures.
              </p>
            </div>
          </div>
        </div>

        <!-- Support Information -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <div class="flex items-start space-x-3">
            <Icon name="mdi:help-circle" class="text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 class="font-medium text-gray-900 mb-1">Need Help?</h3>
              <p class="text-sm text-gray-600 mb-2">
                If you have questions about your payment or need assistance, please contact us:
              </p>
              <div class="space-y-1 text-sm">
                <p class="text-gray-600">Phone: +263 710708027</p>
                <p class="text-gray-600">Email: info@lucernaandsternhealth.co.zw</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const selectedRegion = ref('')

const handleRegionSelection = () => {
  // Handle region selection logic
  console.log('Selected region:', selectedRegion.value)
}

const getRegionName = (region) => {
  const regionNames = {
    'harare': 'Harare',
    'bulawayo': 'Bulawayo',
    'gweru': 'Gweru',
    'mutare': 'Mutare',
    'masvingo': 'Masvingo',
    'victoria-falls': 'Victoria Falls',
    'chinhoyi': 'Chinhoyi',
    'bindura': 'Bindura',
    'other': 'Other Regions'
  }
  return regionNames[region] || region
}

const proceedToPayment = () => {
  if (!selectedRegion.value) return
  
  // Simulate redirect to payment gateway
  alert(`Redirecting to payment gateway for ${getRegionName(selectedRegion.value)}...`)
  
  // In a real implementation, this would redirect to the appropriate payment gateway
  // window.location.href = `/payment-gateway/${selectedRegion.value}`
}
</script> 