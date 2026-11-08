
  (function () {
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var MON_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var LABEL = { pending: "Pending", approved: "Approved", rejected: "Rejected" };

    var ICON_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';
    var ICON_OK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
    var ICON_DOTS = '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/></svg>';

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var view = new Date(today.getFullYear(), today.getMonth(), 1);
    var selected = new Date(today);
    var currentId = null;

    function at(offset, h, m) {
      var d = new Date(today);
      d.setDate(d.getDate() + offset);
      d.setHours(h, m, 0, 0);
      return d;
    }

    var events = [
      { id: 1, topic: "AI Research Interview", notes: "Wants the Q3 numbers first", who: "Jane Cooper", client: "Acme Media", when: at(0, 10, 30), status: "pending" },
      { id: 2, topic: "Lead Gen Survey Review", notes: "No notes", who: "Peter Lee", client: "Northwind", when: at(2, 15, 0), status: "pending" },
      { id: 3, topic: "Content Release Planning", notes: "Needs final copy by Friday", who: "Sara Ahmed", client: "Globex", when: at(0, 14, 0), status: "approved" },
      { id: 4, topic: "SEO Audit Kickoff", notes: "No notes", who: "Omar Hassan", client: "Initech", when: at(3, 9, 0), status: "approved" },
      { id: 5, topic: "Brand Survey Debrief", notes: "Share the raw responses", who: "Jane Cooper", client: "Acme Media", when: at(3, 11, 30), status: "pending" },
      { id: 6, topic: "Quarterly Strategy Call", notes: "Bring last quarter's numbers", who: "Peter Lee", client: "Northwind", when: at(3, 13, 0), status: "approved" },
      { id: 7, topic: "Website Redesign Review", notes: "Client asked to move it", who: "Sara Ahmed", client: "Globex", when: at(3, 16, 0), status: "rejected" },
      { id: 8, topic: "Customer Interview Prep", notes: "No notes", who: "Omar Hassan", client: "Initech", when: at(5, 12, 0), status: "approved" },
      { id: 9, topic: "Product Launch Sync", notes: "Wants a short agenda", who: "Jane Cooper", client: "Acme Media", when: at(7, 10, 0), status: "pending" },
      { id: 10, topic: "Analytics Walkthrough", notes: "No notes", who: "Peter Lee", client: "Northwind", when: at(9, 15, 30), status: "approved" },
      { id: 11, topic: "Social Media Plan", notes: "Prefers the morning", who: "Sara Ahmed", client: "Globex", when: at(12, 9, 30), status: "rejected" },
      { id: 12, topic: "Budget Review", notes: "Finance will join", who: "Omar Hassan", client: "Initech", when: at(-2, 11, 0), status: "approved" },
      { id: 13, topic: "Onboarding Session", notes: "No notes", who: "Jane Cooper", client: "Acme Media", when: at(-5, 14, 30), status: "approved" },
      { id: 14, topic: "Survey Results Review", notes: "Wants charts included", who: "Peter Lee", client: "Northwind", when: at(20, 10, 0), status: "pending" }
    ];

    var sent = [
      { topic: "Q3 content review", client: "Acme Media", when: at(4, 11, 0), status: "pending" },
      { topic: "Website analytics check-in", client: "Northwind", when: at(6, 14, 0), status: "approved" },
      { topic: "Campaign kickoff", client: "Globex", when: at(-3, 10, 0), status: "rejected" }
    ];

    var clients = ["Acme Media", "Northwind", "Globex", "Initech"];

    function esc(s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    }

    function same(a, b) {
      return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    }

    function fmtDate(d) {
      return MON_SHORT[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    }

    function fmtTime(d) {
      var h = d.getHours();
      var m = d.getMinutes();
      var ap = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return h + ":" + (m < 10 ? "0" + m : m) + " " + ap;
    }

    function eventsOn(d) {
      return events
        .filter(function (e) { return same(e.when, d); })
        .sort(function (a, b) { return a.when - b.when; });
    }

    function find(id) {
      for (var i = 0; i < events.length; i++) {
        if (events[i].id === id) return events[i];
      }
      return null;
    }

    function fresh(id) {
      var el = document.getElementById(id);
      if (!el) return null;
      var copy = el.cloneNode(true);
      el.parentNode.replaceChild(copy, el);
      return copy;
    }

    function setText(id, value) {
      var el = document.getElementById(id);
      if (el) el.textContent = value;
    }

    function renderGrid() {
      var grid = document.getElementById("calendarGrid");
      if (!grid) return;

      setText("calendarMonthTitle", MONTHS[view.getMonth()] + " " + view.getFullYear());
      grid.classList.remove("one-day");

      var html = DAYS.map(function (d) {
        return '<div class="day-header">' + d + "</div>";
      }).join("");

      var start = new Date(view);
      start.setDate(1 - view.getDay());

      var daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
      var total = Math.ceil((view.getDay() + daysInMonth) / 7) * 7;

      for (var i = 0; i < total; i++) {
        var d = new Date(start);
        d.setDate(start.getDate() + i);

        var list = eventsOn(d);
        var shown = list.slice(0, 3);
        var cls = "day-cell";

        if (d.getMonth() !== view.getMonth()) cls += " other-month";
        if (same(d, today)) cls += " today-cell";
        if (same(d, selected)) cls += " selected-cell";

        var cards = shown.map(function (e) {
          return '<div class="event-card ' + e.status + '"><span class="ev-line">' + esc(e.topic) + '</span><small class="ev-line">' + fmtTime(e.when) + "</small></div>";
        }).join("");

        var more = list.length > 3 ? '<div class="more-events">+' + (list.length - 3) + " more</div>" : "";

        html += '<div class="' + cls + '" data-ts="' + d.getTime() + '" data-count="' + shown.length + '"><span class="day-number">' + d.getDate() + "</span>" + cards + more + "</div>";
      }

      grid.innerHTML = html;
    }

    function renderSchedule() {
      var box = document.getElementById("dailySchedule");
      if (!box) return;

      setText("dailyScheduleTitle", "Daily Schedule - " + fmtDate(selected));

      var list = eventsOn(selected);

      if (!list.length) {
        box.innerHTML = '<div style="padding:22px 0;color:var(--muted);text-align:center;">No meetings on this day</div>';
        return;
      }

      box.innerHTML = list.map(function (e) {
        return '<div class="schedule-row">' +
          '<div class="schedule-date"><span class="m">' + MON_SHORT[e.when.getMonth()] + '</span><span class="d">' + e.when.getDate() + "</span></div>" +
          '<div class="schedule-info"><h4>' + esc(e.topic) + "</h4><p>" + esc(e.who) + " - " + esc(e.client) + "</p></div>" +
          '<span class="badge ' + e.status + '">' + LABEL[e.status] + "</span>" +
          '<span class="schedule-time">' + fmtTime(e.when) + "</span>" +
          "</div>";
      }).join("");
    }

    function renderApprovals() {
      var body = document.getElementById("approvalsTable");
      if (!body) return;

      var pending = events
        .filter(function (e) { return e.status === "pending"; })
        .sort(function (a, b) { return a.when - b.when; });

      if (!pending.length) {
        body.innerHTML = '<tr><td colspan="4" class="empty-cell">No pending approvals</td></tr>';
        return;
      }

      body.innerHTML = pending.map(function (e) {
        return '<tr data-id="' + e.id + '">' +
          '<td><div class="primary-cell">' + esc(e.topic) + '</div><div class="sub-cell">' + esc(e.notes) + "</div></td>" +
          '<td><div class="who"><span class="who-avatar">' + esc(e.who.charAt(0)) + "</span><div><strong>" + esc(e.who) + '</strong><div class="sub-cell">' + esc(e.client) + "</div></div></div></td>" +
          '<td><div class="primary-cell">' + fmtDate(e.when) + '</div><div class="sub-cell">' + fmtTime(e.when) + "</div></td>" +
          '<td><div class="row-actions">' +
          '<button class="icon-btn" type="button" data-act="rejected" title="Decline">' + ICON_X + "</button>" +
          '<button class="icon-btn confirm" type="button" data-act="approved" title="Approve">' + ICON_OK + "</button>" +
          "</div>" +
          '<button class="row-kebab" type="button" data-act="open" title="Details">' + ICON_DOTS + "</button></td>" +
          "</tr>";
      }).join("");
    }

    function renderRequests() {
      var box = document.getElementById("yourRequests");
      if (!box) return;

      box.innerHTML = sent.map(function (r) {
        return '<div class="request-item"><div><h4>' + esc(r.topic) + "</h4><p>" + esc(r.client) + " - " + fmtDate(r.when) + " - " + fmtTime(r.when) + "</p></div>" +
          '<span class="badge ' + r.status + '">' + LABEL[r.status] + "</span></div>";
      }).join("");
    }

    function renderAll() {
      renderGrid();
      renderSchedule();
      renderApprovals();
      renderRequests();
    }

    function decide(id, status) {
      var e = find(id);
      if (!e) return;
      e.status = status;
      renderAll();
    }

    function openModal(e) {
      currentId = e.id;

      setText("reqModalTopic", e.topic);
      setText("reqModalWho", e.who);
      setText("reqModalClient", e.client);
      setText("reqModalDate", fmtDate(e.when));
      setText("reqModalTime", fmtTime(e.when));
      setText("reqModalNotes", e.notes);

      var badge = document.getElementById("reqModalStatus");
      if (badge) {
        badge.className = "badge " + e.status;
        badge.textContent = LABEL[e.status];
      }

      var foot = document.getElementById("reqModalFoot");
      if (foot) foot.hidden = e.status !== "pending";

      var modal = document.getElementById("requestModal");
      if (modal) modal.classList.add("show");
    }

    window.closeRequestModal = function () {
      var modal = document.getElementById("requestModal");
      if (modal) modal.classList.remove("show");
    };

    window.decideFromModal = function (status) {
      decide(currentId, status);
      window.closeRequestModal();
    };

    window.sendRequest = function () {
      var client = document.getElementById("reqClient").value;
      var date = document.getElementById("reqDate").value;
      var time = document.getElementById("reqTime").value;
      var topic = document.getElementById("reqTopic").value.trim();
      var status = document.getElementById("requestStatus");

      if (!client || !date || !time || !topic) {
        if (status) status.textContent = "Fill in client, date, time and topic.";
        return;
      }

      var p = date.split("-");
      var t = time.split(":");

      sent.unshift({
        topic: topic,
        client: client,
        when: new Date(+p[0], +p[1] - 1, +p[2], +t[0], +t[1]),
        status: "pending"
      });

      document.getElementById("reqTopic").value = "";
      document.getElementById("reqNotes").value = "";
      if (status) status.textContent = "Request sent.";
      renderRequests();
    };

    function init() {
      var grid = fresh("calendarGrid");
      var body = fresh("approvalsTable");
      var prev = fresh("prevMonthBtn");
      var next = fresh("nextMonthBtn");
      var todayBtn = fresh("todayBtn");
      var select = document.getElementById("reqClient");

      if (select && select.options.length <= 1) {
        clients.forEach(function (c) {
          var o = document.createElement("option");
          o.value = c;
          o.textContent = c;
          select.appendChild(o);
        });
      }

      if (grid) {
        grid.addEventListener("click", function (ev) {
          var cell = ev.target.closest(".day-cell");
          if (!cell) return;
          selected = new Date(Number(cell.getAttribute("data-ts")));
          if (selected.getMonth() !== view.getMonth()) {
            view = new Date(selected.getFullYear(), selected.getMonth(), 1);
          }
          renderGrid();
          renderSchedule();
        });
      }

      if (body) {
        body.addEventListener("click", function (ev) {
          var btn = ev.target.closest("button[data-act]");
          if (!btn) return;
          var row = btn.closest("tr");
          var e = find(Number(row.getAttribute("data-id")));
          if (!e) return;
          var act = btn.getAttribute("data-act");
          if (act === "open") openModal(e);
          else decide(e.id, act);
        });
      }

      if (prev) {
        prev.addEventListener("click", function () {
          view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
          renderGrid();
        });
      }

      if (next) {
        next.addEventListener("click", function () {
          view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
          renderGrid();
        });
      }

      if (todayBtn) {
        todayBtn.addEventListener("click", function () {
          view = new Date(today.getFullYear(), today.getMonth(), 1);
          selected = new Date(today);
          renderAll();
        });
      }

      renderAll();
    }

    window.addEventListener("load", function () {
      setTimeout(init, 400);
    });
  })();
