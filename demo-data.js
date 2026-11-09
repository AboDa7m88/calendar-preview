(function () {
  DEMO_CLIENTS.splice(0, DEMO_CLIENTS.length, "Acme Media", "Northwind", "Vertex Labs", "Globex", "Initech");

  window.demoData = function () {
    let nextId = 0;

    const ME = "Sarah Miller";
    const ROB = "Rob Lee";

    const fromClient = (offset, time, status, topic, notes, who, company) => ({
      id: ++nextId,
      title: topic,
      topic,
      notes,
      date: demoDate(offset),
      time,
      status,
      requested_by: "user",
      user_name: who,
      company_name: company,
      client: company,
    });

    const fromAdmin = (offset, time, status, topic, notes, who, company, admin) => ({
      id: ++nextId,
      title: topic,
      topic,
      notes,
      date: demoDate(offset),
      time,
      status,
      requested_by: "admin",
      admin_name: admin,
      user_name: who,
      company_name: company,
      client: company,
    });

    return {
      appointments: [
        fromClient(0, "10:30:00", "pending", "AI Research Interview", "Wants the Q3 numbers first", "Jane Cooper", "Acme Media"),
        fromClient(2, "15:00:00", "pending", "Lead Gen Survey Review", "", "Peter Lee", "Northwind"),
        fromClient(4, "09:00:00", "pending", "Brand Voice Workshop", "Bring the latest style guide and two competitor examples so we can compare tone side by side", "Dana White", "Vertex Labs"),
        fromClient(5, "13:30:00", "pending", "Quarterly Content Planning", "Wants to move the launch to the second week", "Sara Ahmed", "Globex"),
        fromClient(7, "11:00:00", "pending", "SEO Audit Walkthrough", "", "Mark Spencer", "Acme Media"),
        fromClient(9, "16:00:00", "pending", "Customer Interview Debrief", "Share the raw recordings beforehand", "Ana Torres", "Northwind"),
        fromClient(12, "10:00:00", "pending", "Campaign Performance Review", "Needs the dashboard access first", "Omar Khalil", "Vertex Labs"),

        fromClient(-1, "14:00:00", "approved", "Onboarding Session", "", "Lina Park", "Acme Media"),
        fromClient(1, "10:00:00", "approved", "Analytics Setup Call", "Wants a GA4 walkthrough", "Tom Reed", "Globex"),
        fromClient(-4, "12:00:00", "rejected", "Pricing Discussion", "Asked for a slot outside office hours", "Ravi Patel", "Initech"),
        fromClient(8, "14:30:00", "approved", "Cross-Channel Attribution and Budget Reallocation Workshop", "", "Lina Park", "Acme Media"),
        fromClient(-33, "10:00:00", "approved", "Year-End Review", "", "Jane Cooper", "Acme Media"),

        fromAdmin(0, "09:30:00", "approved", "Modern SaaS Architecture", "Kick-off for the new build", "Jane Cooper", "Acme Media", ME),
        fromAdmin(1, "12:00:00", "approved", "User Experience Trends", "", "Dana White", "Vertex Labs", ME),
        fromAdmin(6, "15:00:00", "pending", "Feedback loop review", "", "Peter Lee", "Northwind", ME),
        fromAdmin(-3, "11:00:00", "rejected", "Content strategy", "", "Dana White", "Vertex Labs", ROB),
        fromAdmin(4, "11:00:00", "pending", "Q3 Content Review", "Please confirm by Friday", "Sara Ahmed", "Globex", ME),
        fromAdmin(-6, "13:00:00", "approved", "Annual Planning Kickoff", "", "Ravi Patel", "Initech", ME),
        fromAdmin(14, "10:30:00", "pending", "Website Redesign Checkpoint", "Share the new wireframes", "Mark Spencer", "Acme Media", ROB),
        fromAdmin(10, "17:00:00", "rejected", "Social Media Strategy", "Client asked to reschedule", "Tom Reed", "Globex", ROB),
        fromAdmin(35, "14:30:00", "approved", "Next Quarter Kickoff", "", "Peter Lee", "Northwind", ME),

        fromAdmin(3, "09:00:00", "approved", "Design System Review", "", "Lina Park", "Acme Media", ME),
        fromAdmin(3, "10:30:00", "approved", "Roadmap Sync", "", "Peter Lee", "Northwind", ROB),
        fromAdmin(3, "12:00:00", "pending", "Budget Check-in", "", "Sara Ahmed", "Globex", ME),
        fromClient(3, "14:00:00", "rejected", "Contract Renewal Chat", "", "Ravi Patel", "Initech"),
        fromAdmin(3, "15:30:00", "approved", "Launch Readiness", "", "Dana White", "Vertex Labs", ME),
        fromClient(3, "17:00:00", "approved", "Wrap-up Call", "", "Jane Cooper", "Acme Media"),
      ],
    };
  };
})();