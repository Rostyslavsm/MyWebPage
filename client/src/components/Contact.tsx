import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary">Get In Touch</h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-2"></div>
          <p className="text-lg text-secondary/70 mt-4 max-w-2xl mx-auto">
            I'm currently looking for Co-op opportunities. Feel free to reach out if you'd like to connect!
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div className="bg-neutral/30 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-secondary mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <i className='bx bx-envelope text-2xl text-primary'></i>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">Email</h4>
                  <a href="mailto:muretovr@gmail.com" className="text-primary hover:text-accent transition-colors">muretovr@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <i className='bx bx-map text-2xl text-primary'></i>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">Location</h4>
                  <p className="text-secondary/70">Concord, ON</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <i className='bx bx-phone text-2xl text-primary'></i>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">Phone</h4>
                  <a href="tel:+13653557723" className="text-primary hover:text-accent transition-colors">(365) 355-7723</a>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="font-semibold text-secondary mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/rostyslav-muretov-062a84202/" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                    <i className='bx bxl-linkedin'></i>
                  </a>
                  <a href="https://github.com/Rostyslavsm" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                    <i className='bx bxl-github'></i>
                  </a>
                  <a href="mailto:muretovr@gmail.com" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                    <i className='bx bx-envelope'></i>
                  </a>
                </div>
              </div>
              
              <div className="mt-6">
                <a href="/Rostyslav_Muretov_CV.pdf" download className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors font-medium flex items-center gap-2 w-max">
                  <i className='bx bxs-download'></i> Download CV
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold text-secondary mb-6">Send Me a Message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary font-medium">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your Name" 
                          className="w-full px-4 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary font-medium">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your.email@example.com"
                          type="email" 
                          className="w-full px-4 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary font-medium">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="What is this regarding?"
                          className="w-full px-4 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary font-medium">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message here..."
                          rows={4}
                          className="w-full px-4 py-3 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors font-medium flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <i className='bx bx-loader-alt bx-spin'></i> Sending...
                    </>
                  ) : (
                    <>
                      <i className='bx bx-send'></i> Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
