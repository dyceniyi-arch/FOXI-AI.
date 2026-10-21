import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, Alert, StyleSheet
} from "react-native";

const ORANGE = "#FF7A18";
const BG = "#0D0D0F";
const CARD = "#19191E";
const MUTED = "#A1A1AA";

export default function App() {
  const [tab, setTab] = useState("Home");
  const [postText, setPostText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [posts, setPosts] = useState([
    { id: "1", user: "NiyiDyce", handle: "@niyidyce", text: "Welcome to FOXI! 🦊 A new place to connect, create, and explore AI.", likes: 12, liked: false, comments: [] },
    { id: "2", user: "FOXI Community", handle: "@foxicommunity", text: "What are you building today? Share your projects with the community! 🚀", likes: 8, liked: false, comments: [] }
  ]);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [dm, setDm] = useState([]);
  const [dmText, setDmText] = useState("");
  const [following, setFollowing] = useState(false);

  function publishPost() {
    if (!postText.trim()) return;
    setPosts(old => [{ id: Date.now().toString(), user: "You", handle: "@you", text: postText.trim(), likes: 0, liked: false, comments: [] }, ...old]);
    setPostText("");
    setTab("Home");
  }

  function toggleLike(id) {
    setPosts(old => old.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p));
  }

  function addComment(id) {
    if (!commentText.trim()) return;
    setPosts(old => old.map(p => p.id === id ? { ...p, comments: [...p.comments, commentText.trim()] } : p));
    setCommentText("");
  }

  function sendAI() {
    if (!message.trim()) return;
    const question = message.trim();
    setChat(old => [...old, { role: "You", text: question }, { role: "FOXI", text: "This preview stores your message locally in the current session. Connect an AI API to receive real AI answers." }]);
    setMessage("");
  }

  function sendDM() {
    if (!dmText.trim()) return;
    setDm(old => [...old, dmText.trim()]);
    setDmText("");
  }

  function Header() {
    return <View style={styles.header}>
      <View style={styles.brandRow}>
        <View style={styles.logo}><Text style={styles.logoText}>F</Text></View>
        <View><Text style={styles.brand}>FOXI</Text><Text style={styles.tagline}>Connect beyond limits</Text></View>
      </View>
      <TouchableOpacity style={styles.iconButton} onPress={() => setTab("Alerts")}><Text style={styles.iconText}>♧</Text></TouchableOpacity>
    </View>;
  }

  function PostCard({ post }) {
    return <View style={styles.card}>
      <View style={styles.postHeader}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{post.user.charAt(0).toUpperCase()}</Text></View>
        <View style={{ flex: 1 }}><Text style={styles.userName}>{post.user}</Text><Text style={styles.handle}>{post.handle}</Text></View>
        <Text style={styles.more}>•••</Text>
      </View>
      <Text style={styles.postText}>{post.text}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={() => toggleLike(post.id)}><Text style={{ color: post.liked ? ORANGE : MUTED }}>{post.liked ? "♥" : "♡"} {post.likes}</Text></TouchableOpacity>
        <Text style={styles.actionText}>◯ {post.comments.length} comments</Text>
        <TouchableOpacity style={styles.action} onPress={() => Alert.alert("FOXI", "Sharing will be added later.")}><Text style={styles.actionText}>↗ Share</Text></TouchableOpacity>
      </View>
      {post.comments.map((c, i) => <Text key={i} style={styles.comment}><Text style={styles.userName}>You: </Text>{c}</Text>)}
      <View style={styles.commentRow}>
        <TextInput value={post.id === posts[0]?.id ? commentText : undefined} onChangeText={setCommentText} placeholder="Write a comment..." placeholderTextColor={MUTED} style={styles.commentInput} />
        <TouchableOpacity onPress={() => addComment(post.id)}><Text style={styles.sendText}>Send</Text></TouchableOpacity>
      </View>
    </View>;
  }

  function HomeScreen() {
    return <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.heading}>Your feed</Text><Text style={styles.subheading}>Discover what's happening in FOXI.</Text>
      <View style={styles.card}>
        <TextInput value={postText} onChangeText={setPostText} placeholder="What's on your mind?" placeholderTextColor={MUTED} multiline style={styles.postInput} />
        <View style={styles.publishRow}><Text style={styles.handle}>Share your ideas ✨</Text><TouchableOpacity style={styles.primaryButton} onPress={publishPost}><Text style={styles.primaryText}>Post +</Text></TouchableOpacity></View>
      </View>
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </ScrollView>;
  }

  function AIScreen() {
    return <View style={styles.flexPage}>
      <Text style={styles.heading}>FOXI AI 🦊</Text><Text style={styles.subheading}>Your creative AI companion</Text>
      <ScrollView style={styles.chatList}>
        {chat.length === 0 && <View style={styles.welcome}><Text style={styles.welcomeIcon}>✦</Text><Text style={styles.welcomeTitle}>Hey, welcome!</Text><Text style={styles.subheading}>Ask a question or explore an idea.</Text></View>}
        {chat.map((item, i) => <View key={i} style={[styles.bubble, item.role === "You" && styles.userBubble]}><Text style={styles.bubbleLabel}>{item.role}</Text><Text style={styles.postText}>{item.text}</Text></View>)}
      </ScrollView>
      <View style={styles.composer}>
        <TouchableOpacity style={styles.voiceButton} onPress={() => Alert.alert("Voice input", "Microphone input will be added in a later stage.")}><Text style={styles.actionText}>🎙</Text></TouchableOpacity>
        <TextInput value={message} onChangeText={setMessage} placeholder="Message FOXI AI..." placeholderTextColor={MUTED} style={styles.messageInput} onSubmitEditing={sendAI} returnKeyType="send" />
        <TouchableOpacity style={styles.sendButton} onPress={sendAI}><Text style={styles.primaryText}>↑</Text></TouchableOpacity>
      </View>
    </View>;
  }

  function MessagesScreen() {
    return <View style={styles.flexPage}>
      <Text style={styles.heading}>Messages</Text><Text style={styles.subheading}>Your conversations</Text>
      <View style={styles.card}><View style={styles.postHeader}><View style={styles.avatar}><Text style={styles.avatarText}>F</Text></View><View style={{ flex: 1 }}><Text style={styles.userName}>FOXI Community</Text><Text style={styles.handle}>Preview conversation</Text></View><Text style={styles.online}>●</Text></View><Text style={styles.subheading}>Start chatting in your FOXI inbox.</Text></View>
      <ScrollView style={styles.chatList}>{dm.map((m, i) => <View key={i} style={styles.bubble}><Text style={styles.postText}>{m}</Text></View>)}</ScrollView>
      <View style={styles.composer}><TextInput value={dmText} onChangeText={setDmText} placeholder="Write a message..." placeholderTextColor={MUTED} style={styles.messageInput} onSubmitEditing={sendDM} /><TouchableOpacity style={styles.sendButton} onPress={sendDM}><Text style={styles.primaryText}>↑</Text></TouchableOpacity></View>
    </View>;
  }

  function AlertsScreen() {
    return <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.heading}>Notifications</Text><Text style={styles.subheading}>Your latest activity</Text>
      {[
        ["♥", "Welcome to FOXI", "Your social journey starts here."],
        ["✦", "Meet FOXI AI", "Your creative assistant is ready to grow."],
        ["◎", "Build your community", "Follow people and share your ideas."]
      ].map((n, i) => <View style={styles.card} key={i}><View style={styles.postHeader}><View style={styles.avatar}><Text style={styles.avatarText}>{n[0]}</Text></View><View style={{ flex: 1 }}><Text style={styles.userName}>{n[1]}</Text><Text style={styles.subheading}>{n[2]}</Text></View></View></View>)}
    </ScrollView>;
  }

  function ProfileScreen() {
    return <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.heading}>Your profile</Text>
      <View style={[styles.card, styles.profileCard]}>
        <View style={styles.bigAvatar}><Text style={styles.bigAvatarText}>Y</Text></View>
        <Text style={styles.profileName}>Your Name</Text><Text style={styles.handle}>@you</Text><Text style={styles.subheading}>Welcome to my FOXI profile 🦊</Text>
        <View style={styles.stats}>
          <View><Text style={styles.statNumber}>{posts.length}</Text><Text style={styles.handle}>Posts</Text></View>
          <View><Text style={styles.statNumber}>0</Text><Text style={styles.handle}>Followers</Text></View>
          <View><Text style={styles.statNumber}>{following ? 1 : 0}</Text><Text style={styles.handle}>Following</Text></View>
        </View>
        <TouchableOpacity style={styles.primaryButton} onPress={() => setFollowing(!following)}><Text style={styles.primaryText}>{following ? "Following ✓" : "＋ Follow demo"}</Text></TouchableOpacity>
        <Text style={styles.note}>Profile editing and real follower counts will be added with backend setup.</Text>
      </View>
      <Text style={styles.sectionTitle}>Your posts</Text>
      {posts.filter(p => p.user === "You").map(post => <PostCard key={post.id} post={post} />)}
    </ScrollView>;
  }

  const tabs = [["Home", "⌂"], ["AI", "✦"], ["Messages", "✉"], ["Alerts", "♧"], ["Profile", "◉"]];

  return <SafeAreaView style={styles.safe}>
    <StatusBar barStyle="light-content" backgroundColor={BG} />
    <Header />
    <View style={styles.content}>
      {tab === "Home" && <HomeScreen />}
      {tab === "AI" && <AIScreen />}
      {tab === "Messages" && <MessagesScreen />}
      {tab === "Alerts" && <AlertsScreen />}
      {tab === "Profile" && <ProfileScreen />}
    </View>
    <View style={styles.bottomBar}>{tabs.map(([name, symbol]) => <TouchableOpacity key={name} style={styles.tab} onPress={() => setTab(name)}><Text style={[styles.tabIcon, tab === name && styles.activeTab]}>{symbol}</Text><Text style={[styles.tabLabel, tab === name && styles.activeTab]}>{name}</Text></TouchableOpacity>)}</View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG }, content: { flex: 1 }, flexPage: { flex: 1, padding: 16 }, page: { padding: 16, paddingBottom: 28 },
  header: { height: 68, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#27272A" },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 10 }, logo: { width: 40, height: 40, backgroundColor: ORANGE, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  logoText: { color: "#FFFFFF", fontSize: 24, fontWeight: "900" }, brand: { color: "#FFFFFF", fontSize: 20, fontWeight: "900" }, tagline: { color: MUTED, fontSize: 11 },
  iconButton: { width: 40, height: 40, backgroundColor: CARD, borderRadius: 14, alignItems: "center", justifyContent: "center" }, iconText: { color: ORANGE, fontSize: 23 },
  heading: { color: "#FFFFFF", fontSize: 25, fontWeight: "800" }, subheading: { color: MUTED, fontSize: 13, lineHeight: 20, marginTop: 5 },
  card: { backgroundColor: CARD, borderWidth: 1, borderColor: "#29292F", borderRadius: 18, padding: 15, marginTop: 14 },
  postHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 }, avatar: { width: 42, height: 42, backgroundColor: "#35251B", borderRadius: 15, alignItems: "center", justifyContent: "center" },
  avatarText: { color: ORANGE, fontWeight: "800", fontSize: 18 }, userName: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 }, handle: { color: MUTED, fontSize: 12, marginTop: 3 }, more: { color: MUTED, fontSize: 19 },
  postText: { color: "#E4E4E7", fontSize: 14, lineHeight: 22 }, postInput: { color: "#FFFFFF", minHeight: 70, fontSize: 15, textAlignVertical: "top" },
  publishRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: 1, borderTopColor: "#303036", paddingTop: 12 },
  primaryButton: { backgroundColor: ORANGE, borderRadius: 12, paddingHorizontal: 17, paddingVertical: 10, alignSelf: "flex-start", marginTop: 8 }, primaryText: { color: "#FFFFFF", fontWeight: "800" },
  actions: { flexDirection: "row", gap: 18, alignItems: "center", paddingTop: 14, marginTop: 14, borderTopWidth: 1, borderTopColor: "#303036" }, action: { paddingVertical: 4 }, actionText: { color: MUTED, fontSize: 13 },
  commentRow: { flexDirection: "row", alignItems: "center", marginTop: 12, gap: 8 }, commentInput: { flex: 1, backgroundColor: "#101014", color: "#FFFFFF", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9, fontSize: 12 },
  sendText: { color: ORANGE, fontWeight: "700" }, comment: { color: "#D4D4D8", fontSize: 13, marginTop: 8 }, chatList: { flex: 1, marginTop: 15 },
  welcome: { alignItems: "center", marginTop: 65 }, welcomeIcon: { color: ORANGE, fontSize: 48 }, welcomeTitle: { color: "#FFFFFF", fontSize: 21, fontWeight: "800", marginTop: 12 },
  bubble: { backgroundColor: CARD, borderRadius: 15, padding: 13, marginBottom: 12, alignSelf: "flex-start", maxWidth: "92%" }, userBubble: { backgroundColor: "#402512", alignSelf: "flex-end" },
  bubbleLabel: { color: ORANGE, fontSize: 11, fontWeight: "800", marginBottom: 5 }, composer: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#29292F" },
  voiceButton: { width: 40, height: 44, borderRadius: 13, backgroundColor: CARD, alignItems: "center", justifyContent: "center" }, messageInput: { flex: 1, backgroundColor: CARD, color: "#FFFFFF", paddingHorizontal: 14, paddingVertical: 12, borderRadius: 14, fontSize: 13 },
  sendButton: { backgroundColor: ORANGE, width: 42, height: 42, borderRadius: 14, alignItems: "center", justifyContent: "center" }, online: { color: "#22C55E", fontSize: 12 },
  profileCard: { alignItems: "center", paddingVertical: 25 }, bigAvatar: { width: 85, height: 85, backgroundColor: "#35251B", borderRadius: 30, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: ORANGE },
  bigAvatarText: { color: ORANGE, fontSize: 36, fontWeight: "900" }, profileName: { color: "#FFFFFF", fontSize: 21, fontWeight: "800", marginTop: 12 },
  stats: { flexDirection: "row", justifyContent: "space-around", width: "100%", marginVertical: 24 }, statNumber: { color: "#FFFFFF", fontSize: 19, fontWeight: "800", textAlign: "center" },
  note: { color: MUTED, fontSize: 11, textAlign: "center", lineHeight: 17, marginTop: 16 }, sectionTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "800", marginTop: 22 },
  bottomBar: { flexDirection: "row", backgroundColor: "#141417", borderTopWidth: 1, borderTopColor: "#29292F", paddingTop: 10, paddingBottom: 8 },
  tab: { flex: 1, alignItems: "center", gap: 4 }, tabIcon: { color: MUTED, fontSize: 21 }, tabLabel: { color: MUTED, fontSize: 10 }, activeTab: { color: ORANGE, fontWeight: "800" }
});
