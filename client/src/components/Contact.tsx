import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    // Add CSS for card glow animation
    if (!document.getElementById('contact-card-animation')) {
      const style = document.createElement('style');
      style.id = 'contact-card-animation';
      style.innerHTML = `
        .card-box {
          position: relative;
          display: grid;
          place-items: center;
          overflow: hidden;
          border-radius: 16px;
          min-height: 400px;
          height: auto;
          box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 10px 0px,
                     rgba(0, 0, 0, 0.5) 0px 2px 25px 0px;
        }
        
        .card-box::before {
          content: "";
          position: absolute;
          width: 40%;
          height: 200%;
          background: linear-gradient(to right, #8b5cf6, #9f75ff, #6d28d9);
          transform-origin: center;
          animation: glowing 13s linear infinite;
          z-index: 1;
        }
        
        .card-box.cyan::before {
          background: linear-gradient(to right, #06b6d4, #22d3ee, #0891b2, #0e7490);
        }
        
        .card-box.reverse::before {
          animation: glowing-reverse 16s linear infinite;
        }
        
        .card {
          position: relative;
          width: 95%;
          min-height: 95%;
          height: auto;
          margin: 10px;
          background: rgba(17, 17, 17, 0.8);
          backdrop-filter: blur(12px);
          border-radius: 14px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 60px -12px inset,
                     rgba(0, 0, 0, 0.5) 0px 18px 36px -18px inset;
        }
        
        @keyframes glowing {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes glowing-reverse {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      // Clean up on unmount
      const style = document.getElementById('contact-card-animation');
      if (style) {
        style.remove();
      }
    };
  }, []);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut",
        type: "spring",
        damping: 12
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut"
      }
    }
  };
  
  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut"
      }
    }
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      console.log('Submitting contact form:', { ...data, message: '[Content hidden]' });
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Contact form submission failed:', result);
        throw new Error(result.error || 'Failed to send message');
      }

      console.log('Contact form submitted successfully');
      
      toast({
        title: "Success!",
        description: "Your message has been sent. I'll get back to you soon!",
        className: "text-green-500",
      });

      form.reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.section 
      id="contact" 
      className="py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          variants={titleVariants}
        >
          <h2 className="text-3xl font-bold text-white">Get In Touch</h2>
          <div className="h-1 w-20 bg-[#8b5cf6] mx-auto mt-2"></div>
          <motion.p 
            className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            I'm currently looking for Co-op opportunities. Feel free to reach out if you'd like to connect!
          </motion.p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Information */}
          <motion.div 
            className="card-box cyan"
            variants={cardVariants}
          >
            <div className="card p-8">
              <motion.h3 
                className="text-2xl font-bold text-white mb-6"
                variants={itemVariants}
              >
                Contact Information
              </motion.h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="bg-[#8b5cf6]/10 p-3 rounded-lg mr-4"
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: "rgba(139, 92, 246, 0.2)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <i className='bx bx-envelope text-2xl text-[#8b5cf6]'></i>
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <motion.a 
                      href="mailto:muretovr@gmail.com" 
                      className="text-[#8b5cf6] hover:text-[#9f75ff] transition-colors shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] px-2 py-1 rounded"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      muretovr@gmail.com
                    </motion.a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="bg-[#8b5cf6]/10 p-3 rounded-lg mr-4"
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: "rgba(139, 92, 246, 0.2)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <i className='bx bx-map text-2xl text-[#8b5cf6]'></i>
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white">Location</h4>
                    <p className="text-gray-400">Concord, ON</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="bg-[#8b5cf6]/10 p-3 rounded-lg mr-4"
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: "rgba(139, 92, 246, 0.2)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <i className='bx bx-phone text-2xl text-[#8b5cf6]'></i>
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white">Phone</h4>
                    <motion.a 
                      href="tel:+13653557723" 
                      className="text-[#8b5cf6] hover:text-[#9f75ff] transition-colors shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] px-2 py-1 rounded"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      (365) 355-7723
                    </motion.a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mt-10"
                  variants={itemVariants}
                >
                  <h4 className="font-semibold text-white mb-4">Connect With Me</h4>
                  <div className="flex space-x-4">
                    <motion.a 
                      href="https://www.linkedin.com/in/rostyslav-muretov-062a84202/" 
                      className="w-10 h-10 bg-[#8b5cf6] text-white rounded-full flex items-center justify-center hover:bg-[#9f75ff] transition-colors shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className='bx bxl-linkedin'></i>
                    </motion.a>
                    <motion.a 
                      href="https://github.com/Rostyslavsm" 
                      className="w-10 h-10 bg-[#8b5cf6] text-white rounded-full flex items-center justify-center hover:bg-[#9f75ff] transition-colors shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className='bx bxl-github'></i>
                    </motion.a>
                    <motion.a 
                      href="mailto:muretovr@gmail.com" 
                      className="w-10 h-10 bg-[#8b5cf6] text-white rounded-full flex items-center justify-center hover:bg-[#9f75ff] transition-colors shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className='bx bx-envelope'></i>
                    </motion.a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mt-6"
                  variants={itemVariants}
                >
                  <motion.a 
                    href="/Rostyslav_Muretov_CV.pdf" 
                    download 
                    className="px-6 py-3 bg-[#8b5cf6] text-white rounded-lg hover:bg-[#9f75ff] transition-colors font-medium flex items-center gap-2 w-max shadow-[0_0_15px_rgba(255,255,255,0.35)] hover:shadow-[0_0_20px_rgba(255,255,255,0.55)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className='bx bxs-download'></i> Download CV
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="card-box reverse"
            variants={cardVariants}
          >
            <div className="card p-8">
              <motion.h3 
                className="text-2xl font-bold text-white mb-6"
                variants={itemVariants}
              >
                Send Me a Message
              </motion.h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <motion.div variants={formItemVariants}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your Name" 
                              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222222] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/50 text-white placeholder-gray-500"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  
                  <motion.div variants={formItemVariants}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your.email@example.com"
                              type="email" 
                              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222222] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/50 text-white placeholder-gray-500"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  
                  <motion.div variants={formItemVariants}>
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium">Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="What is this regarding?"
                              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222222] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/50 text-white placeholder-gray-500"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  
                  <motion.div variants={formItemVariants}>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message here..."
                              rows={4}
                              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222222] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/50 text-white placeholder-gray-500"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  
                  <motion.div 
                    variants={formItemVariants}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-[#8b5cf6] text-white rounded-lg hover:bg-[#9f75ff] transition-colors font-medium flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.35)] hover:shadow-[0_0_20px_rgba(255,255,255,0.55)]"
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
                  </motion.div>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
