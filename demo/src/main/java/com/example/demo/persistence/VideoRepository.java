package com.example.demo.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.VideoEntity;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<VideoEntity, String>{
    List<VideoEntity> findByUserId(String userId);
}
