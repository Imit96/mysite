const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://clkianeivyexjsyujbil.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsa2lhbmVpdnlleGpzeXVqYmlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMDgwMTYsImV4cCI6MjA4OTU4NDAxNn0._QyYgE0A4Y7bOQZxvrEEWoKJSYlaEHrSiRlvSzQiHQ4'
);
async function check() {
  const { data, error } = await supabase.from('testimonials').select('*');
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Testimonials count:', data.length);
    console.log(data);
  }
}
check();
