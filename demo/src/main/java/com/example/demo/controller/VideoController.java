package com.example.demo.controller;

import com.example.demo.dto.ResponseDTO;
import com.example.demo.dto.TestRequestBodyDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.service.VideoService;
import com.example.demo.dto.VideoDTO;
import com.example.demo.model.VideoEntity;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@RestController
@RequestMapping("video")
public class VideoController {

	@Autowired
	private  VideoService service;

	@GetMapping
	public String testController() {
		return "Hello World!";
	}

	@GetMapping("/testGetMapping")
	public String testControllerWithPath() {
		return "Hello World! testGetMapping ";
	}

	@GetMapping("/{id}")
	public String testControllerWithPathVariables(@PathVariable(required = false) int id) {
		return "Hello World! ID " + id;
	}

	@GetMapping("/testvideo")
	public ResponseEntity<?> testVideo(){
		String str = service.testService(); // 테스트 서비스 사용
		List<String> list = new ArrayList<>();
		list.add(str);
		ResponseDTO<String> response = ResponseDTO.<String>builder().data(list).build();
		return ResponseEntity.ok(response);
	}

	@PostMapping
	public ResponseEntity<?> create(
			@AuthenticationPrincipal String userId,
			@RequestBody VideoDTO dto) {
		try {
			// (1) TodoEntity로 변환한다.
			VideoEntity entity = VideoDTO.toEntity(dto);

			// (2) id를 null로 초기화 한다. 생성 당시에는 id가 없어야 하기 때문이다.
			entity.setId(null);

			// (3) 임시 유저 아이디를 설정 해 준다. 이 부분은 4장 인증과 인가에서 수정 할 예정이다. 지금은 인증과 인가 기능이 없으므로 한 유저(temporary-user)만 로그인 없이 사용 가능한 어플리케이션인 셈이다
			entity.setUserId(userId);

			// (4) 서비스를 이용해 Todo엔티티를 생성한다.
			List<VideoEntity> entities = service.create(entity);

			// (5) 자바 스트림을 이용해 리턴된 엔티티 리스트를 TodoDTO리스트로 변환한다.

			List<VideoDTO> dtos = entities.stream().map(VideoDTO::new).collect(Collectors.toList());

			// (6) 변환된 TodoDTO리스트를 이용해ResponseDTO를 초기화한다.
			ResponseDTO<VideoDTO> response = ResponseDTO.<VideoDTO>builder().data(dtos).build();

			// (7) ResponseDTO를 리턴한다.
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			// (8) 혹시 예외가 나는 경우 dto대신 error에 메시지를 넣어 리턴한다.

			String error = e.getMessage();
			ResponseDTO<VideoDTO> response = ResponseDTO.<VideoDTO>builder().error(error).build();
			return ResponseEntity.badRequest().body(response);
		}
	}

}
