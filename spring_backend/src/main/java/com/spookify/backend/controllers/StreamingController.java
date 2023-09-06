package com.spookify.backend.controllers;

import com.spookify.backend.services.StreamingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.*;


import reactor.core.publisher.Mono;


@RestController
@CrossOrigin(origins = "**", maxAge = 3600)
@RequestMapping("api/streaming")
public class StreamingController {


    private StreamingService service;
    @Autowired
    public StreamingController(StreamingService service) {
        System.out.println("Inside StreamingController constructor");
        this.service = service;
    }

    @GetMapping(value = "audio/{title}", produces = "audio/mpeg")
    public Mono<Resource> getAudios(@PathVariable String title, @RequestHeader("Range") String range) {
        System.out.println("range in bytes() : " + range);
        return service.getAudio(title);
    }

}
