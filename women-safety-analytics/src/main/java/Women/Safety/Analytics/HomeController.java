package Women.Safety.Analytics;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }

    @GetMapping("/reports")
    public String reports() {
        return "reports";
    }

    @GetMapping("/submit-report")
    public String submitReport() {
        return "submit-report";
    }

    @GetMapping("/admin")
    public String admin() {
        return "admin";
    }
}