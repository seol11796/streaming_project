package com.example.demo.dto;

import com.example.demo.model.VideoEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class VideoDTO {
    private String id;
    private String title;
    private String url;

    public VideoDTO(final VideoEntity entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.url = entity.getUrl();
        //this.done = entity.isDone();
    }

    public static VideoEntity toEntity(final VideoDTO dto) {
        return VideoEntity.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .url(dto.getUrl())
                .build();
    }
}

