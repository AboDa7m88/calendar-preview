(function () {
  DEMO_CLIENTS.splice(0, DEMO_CLIENTS.length, "Acme Media", "Northwind", "Vertex Labs", "Globex", "Initech");

  window.demoData = function () {
    let nextId = 0;

    const ME = "Sarah Miller";

    const fromClient = (offset, time, status, topic, notes, who, company, type) => ({
      id: ++nextId,
      title: topic,
      topic,
      notes,
      date: demoDate(offset),
      time,
      status,
      type,
      requested_by: "user",
      user_name: who,
      company_name: company,
      client: company,
    });

    const fromAdmin = (offset, time, status, topic, notes, who, company, admin, type) => ({
      id: ++nextId,
      title: topic,
      topic,
      notes,
      date: demoDate(offset),
      time,
      status,
      type,
      requested_by: "admin",
      admin_name: admin,
      user_name: who,
      company_name: company,
      client: company,
    });

    return {
      appointments: [
        // Past
        fromAdmin(-5, "10:00:00", "approved", "Q4 Strategy Kickoff", "Agreed on goals and channels", "Lina Park", "Acme Media", ME, "meeting"),
        fromAdmin(-3, "14:30:00", "approved", "Product Launch Article Live", "", "Dana White", "Vertex Labs", ME, "publish"),
        fromAdmin(-1, "11:00:00", "approved", "Audit Findings Review", "", "Omar Khalil", "Initech", ME, "meeting"),

        // Today (4 cards, to test the dense cell)
        fromAdmin(0, "09:00:00", "approved", "Weekly Sync", "", "Jane Cooper", "Acme Media", ME, "meeting"),
        fromAdmin(0, "11:30:00", "approved", "Email Campaign Scheduled", "", "Tom Reed", "Globex", ME, "schedule"),
        fromAdmin(0, "14:00:00", "approved", "Keyword Research Phase", "", "Peter Lee", "Northwind", ME, "phase"),
        fromAdmin(0, "16:30:00", "approved", "Landing Page Published", "", "Sara Ahmed", "Globex", ME, "publish"),

        // Client requests waiting on you (6, so the pager shows)
        fromClient(1, "10:00:00", "pending", "Content Calendar Review", "Please bring the December plan", "Dana White", "Vertex Labs", "meeting"),
        fromClient(2, "13:00:00", "pending", "Press Release Approval", "", "Mark Spencer", "Acme Media", "publish"),
        fromClient(3, "15:30:00", "pending", "Budget Discussion", "Need to cut scope by 10%", "Ravi Patel", "Initech", "meeting"),
        fromClient(5, "11:00:00", "pending", "Social Media Audit", "", "Ana Torres", "Northwind", "phase"),
        fromClient(6, "12:30:00", "pending", "Newsletter Draft Sign-off", "Deadline is Friday", "Tom Reed", "Globex", "schedule"),
        fromClient(8, "09:30:00", "pending", "Quarterly Review", "", "Jane Cooper", "Acme Media", "meeting"),

        // A declined one
        fromClient(4, "19:00:00", "rejected", "After-hours Call", "Asked for a slot outside office hours", "Peter Lee", "Northwind", "meeting"),

        // Upcoming, sent by your team
        fromAdmin(2, "10:30:00", "approved", "Social Posts Scheduled", "", "Ana Torres", "Northwind", ME, "schedule"),
        fromAdmin(4, "13:00:00", "approved", "Design Phase", "", "Lina Park", "Acme Media", ME, "phase"),
        fromAdmin(6, "10:00:00", "pending", "Brand Guidelines Walkthrough", "Waiting for client to confirm", "Dana White", "Vertex Labs", ME, "meeting"),
        fromAdmin(7, "15:00:00", "approved", "Podcast Episode Live", "", "Omar Khalil", "Vertex Labs", ME, "publish"),
        fromAdmin(10, "11:00:00", "pending", "Analytics Handover", "", "Sara Ahmed", "Globex", ME, "meeting"),
        fromAdmin(12, "14:00:00", "approved", "Blog Series Scheduled", "", "Sara Ahmed", "Globex", ME, "schedule"),
      ],
    };
  };
})();