package org.chtijbug.drools.indexer.route;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

@Component
public class DeclareNewSftpRouter extends RouteBuilder {
    @Override
    public void configure() throws Exception {
        from("quartz2://myGroup/myTimerName?cron=0/5+*+*+?+*+*").to("bean:startRouteService?method=updateConfig()");
    }
}
